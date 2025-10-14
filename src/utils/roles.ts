import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type UserRole = 'user' | 'owner' | 'admin';

export interface RoleData {
  emails: string[];
}

// Check if user has a specific role
export const checkUserRole = async (userEmail: string, role: UserRole): Promise<boolean> => {
  try {
    // For 'user' role, we don't check Firestore - it's the default
    if (role === 'user') {
      const [isAdmin, isOwner] = await Promise.all([
        checkUserRole(userEmail, 'admin'),
        checkUserRole(userEmail, 'owner')
      ]);
      return !isAdmin && !isOwner; // User if not admin or owner
    }
    
    const roleDoc = await getDoc(doc(db, 'roles', `${role}Emails`));
    
    if (roleDoc.exists()) {
      const roleData = roleDoc.data() as RoleData;
      return roleData.emails.includes(userEmail);
    }
    
    return false;
  } catch (error) {
    console.error(`Error checking ${role} role:`, error);
    return false;
  }
};

// Get all roles for a user
export const getUserRoles = async (userEmail: string): Promise<UserRole[]> => {
  const roles: UserRole[] = [];
  
  try {
    // Check each role type
    const [isAdmin, isOwner] = await Promise.all([
      checkUserRole(userEmail, 'admin'),
      checkUserRole(userEmail, 'owner')
    ]);
    
    if (isAdmin) roles.push('admin');
    if (isOwner) roles.push('owner');
    
    // If no special roles, default to 'user'
    if (roles.length === 0) roles.push('user');
    
    return roles;
  } catch (error) {
    console.error('Error getting user roles:', error);
    return ['user']; // Default to user role on error
  }
};

// Check if user is admin
export const isAdmin = async (userEmail: string): Promise<boolean> => {
  return checkUserRole(userEmail, 'admin');
};

// Check if user is owner
export const isOwner = async (userEmail: string): Promise<boolean> => {
  return checkUserRole(userEmail, 'owner');
};

// Check if user has any elevated privileges
export const hasElevatedPrivileges = async (userEmail: string): Promise<boolean> => {
  const [admin, owner] = await Promise.all([
    isAdmin(userEmail),
    isOwner(userEmail)
  ]);
  
  return admin || owner;
};

// Helper function to get the highest role
export const getHighestRole = async (userEmail: string): Promise<UserRole> => {
  const roles = await getUserRoles(userEmail);
  
  if (roles.includes('admin')) return 'admin';
  if (roles.includes('owner')) return 'owner';
  return 'user';
};
