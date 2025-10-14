import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { getUserRoles, UserRole, getHighestRole } from '@/utils/roles';

interface UserData {
  uid: string;
  email: string;
  name: string;
  likedProperties: string[];
  createdAt: Date;
  roles?: UserRole[];
  highestRole?: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: "searcher" | "owner") => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  togglePropertyLike: (propertyId: string) => Promise<void>;
  // Role management
  isAdmin: boolean;
  isOwner: boolean;
  hasElevatedPrivileges: boolean;
  userRoles: UserRole[];
  highestRole: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Role management state
  const [userRoles, setUserRoles] = useState<UserRole[]>(['user']);
  const [highestRole, setHighestRole] = useState<UserRole>('user');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [hasElevatedPrivileges, setHasElevatedPrivileges] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ User logged in successfully');
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, userType: "searcher" | "owner") => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        name,
        likedProperties: [],
        createdAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      // Check if this is an admin email and add to admin list
      const ADMIN_EMAILS = ['diveshasenthil@gmail.com']; // Add your admin emails here
      
      if (ADMIN_EMAILS.includes(email.toLowerCase())) {
        try {
          // Get current admin emails
          const adminDoc = await getDoc(doc(db, 'roles', 'adminEmails'));
          const currentAdminEmails = adminDoc.exists() ? adminDoc.data().emails || [] : [];
          
          // Add new admin email if not already present
          if (!currentAdminEmails.includes(email)) {
            await setDoc(doc(db, 'roles', 'adminEmails'), {
              emails: [...currentAdminEmails, email]
            });
            console.log('✅ User added to admin emails');
          }
        } catch (roleError) {
          console.error('❌ Error adding user to admin emails:', roleError);
          // Don't throw error - user is still registered
        }
      }
      // If user selected "owner", add them to owner emails
      else if (userType === "owner") {
        try {
          // Get current owner emails
          const ownerDoc = await getDoc(doc(db, 'roles', 'ownerEmails'));
          const currentEmails = ownerDoc.exists() ? ownerDoc.data().emails || [] : [];
          
          // Add new owner email if not already present
          if (!currentEmails.includes(email)) {
            await setDoc(doc(db, 'roles', 'ownerEmails'), {
              emails: [...currentEmails, email]
            });
            console.log('✅ User added to owner emails');
          }
        } catch (roleError) {
          console.error('❌ Error adding user to owner emails:', roleError);
          // Don't throw error - user is still registered
        }
      }
      
      console.log('✅ User registered and data saved to Firestore');
    } catch (error: any) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, data, { merge: true });
    
    // Update local state
    setUserData(prev => prev ? { ...prev, ...data } : null);
  };

  const togglePropertyLike = async (propertyId: string) => {
    if (!currentUser || !userData) return;
    
    const newLikedProperties = userData.likedProperties.includes(propertyId)
      ? userData.likedProperties.filter(id => id !== propertyId)
      : [...userData.likedProperties, propertyId];
    
    await updateUserData({ likedProperties: newLikedProperties });
  };

  // Update user roles based on email
  const updateUserRoles = async (userEmail: string) => {
    try {
      console.log('🔄 Checking roles for email:', userEmail);
      const roles = await getUserRoles(userEmail);
      const highest = await getHighestRole(userEmail);
      
      setUserRoles(roles);
      setHighestRole(highest);
      setIsAdmin(roles.includes('admin'));
      setIsOwner(roles.includes('owner'));
      setHasElevatedPrivileges(roles.includes('admin') || roles.includes('owner'));
      
      console.log('✅ User roles updated:', { 
        email: userEmail,
        roles, 
        highest,
        isAdmin: roles.includes('admin'),
        isOwner: roles.includes('owner'),
        hasElevatedPrivileges: roles.includes('admin') || roles.includes('owner')
      });
    } catch (error) {
      console.error('❌ Error updating user roles:', error);
      // Reset to default user role on error
      setUserRoles(['user']);
      setHighestRole('user');
      setIsAdmin(false);
      setIsOwner(false);
      setHasElevatedPrivileges(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUserData(data);
        }
        
        // Update user roles
        await updateUserRoles(user.email!);
      } else {
        setUserData(null);
        // Reset roles when user logs out
        setUserRoles(['user']);
        setHighestRole('user');
        setIsAdmin(false);
        setIsOwner(false);
        setHasElevatedPrivileges(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    login,
    register,
    logout,
    loading,
    updateUserData,
    togglePropertyLike,
    // Role management
    isAdmin,
    isOwner,
    hasElevatedPrivileges,
    userRoles,
    highestRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
