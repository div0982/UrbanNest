import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roles: string[];
  isVerified: boolean;
  profileImageUrl?: string;
}

interface SupabaseAuthContextType {
  user: User | null;
  userData: UserData | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<UserData>) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateUserData: (data: Partial<UserData>) => Promise<{ error: AuthError | null }>;
  isAdmin: boolean;
  isOwner: boolean;
  hasElevatedPrivileges: boolean;
  highestRole: string;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};

interface SupabaseAuthProviderProps {
  children: React.ReactNode;
}

export const SupabaseAuthProvider: React.FC<SupabaseAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Get user data from users table
  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name || '',
        email: data.email,
        phone: data.phone,
        roles: data.roles || ['user'],
        isVerified: data.is_verified || false,
        profileImageUrl: data.profile_image_url
      };
    } catch (error) {
      console.error('Error in fetchUserData:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else if (session) {
          setSession(session);
          setUser(session.user);
          
          // Fetch user data from users table
          const userData = await fetchUserData(session.user.id);
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session) {
          setSession(session);
          setUser(session.user);
          
          // Fetch user data from users table
          const userData = await fetchUserData(session.user.id);
          setUserData(userData);
        } else {
          setSession(null);
          setUser(null);
          setUserData(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string, userData: Partial<UserData>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        // Create user record in users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: userData.name || '',
            phone: userData.phone,
            roles: userData.roles || ['user'],
            is_verified: userData.isVerified || false,
            profile_image_url: userData.profileImageUrl
          });

        if (insertError) {
          console.error('Error creating user record:', insertError);
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  // Update user data function
  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) {
      return { error: new Error('No user logged in') as AuthError };
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: data.name,
          phone: data.phone,
          roles: data.roles,
          is_verified: data.isVerified,
          profile_image_url: data.profileImageUrl
        })
        .eq('id', user.id);

      if (error) {
        return { error: error as AuthError };
      }

      // Update local state
      if (userData) {
        setUserData({ ...userData, ...data });
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  // Calculate user roles
  const isAdmin = userData?.roles.includes('admin') || false;
  const isOwner = userData?.roles.includes('owner') || false;
  const hasElevatedPrivileges = isAdmin || isOwner;
  const highestRole = userData?.roles.includes('admin') ? 'admin' : 
                     userData?.roles.includes('owner') ? 'owner' : 'user';

  const value: SupabaseAuthContextType = {
    user,
    userData,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserData,
    isAdmin,
    isOwner,
    hasElevatedPrivileges,
    highestRole,
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export default SupabaseAuthProvider;
