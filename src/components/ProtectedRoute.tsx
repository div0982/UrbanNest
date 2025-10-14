import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, UserCheck, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'owner' | 'elevated';
  fallbackPath?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/' 
}: ProtectedRouteProps) => {
  const { currentUser, isAdmin, isOwner, hasElevatedPrivileges, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirements
  if (requiredRole) {
    let hasRequiredRole = false;

    switch (requiredRole) {
      case 'admin':
        hasRequiredRole = isAdmin;
        break;
      case 'owner':
        hasRequiredRole = isOwner;
        break;
      case 'elevated':
        hasRequiredRole = hasElevatedPrivileges;
        break;
    }

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              {requiredRole === 'admin' ? (
                <Shield className="h-12 w-12 mx-auto mb-4 text-red-500" />
              ) : requiredRole === 'owner' ? (
                <UserCheck className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              ) : (
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              )}
              
              <h3 className="text-lg font-semibold mb-2">
                {requiredRole === 'admin' && 'Admin Access Required'}
                {requiredRole === 'owner' && 'Owner Access Required'}
                {requiredRole === 'elevated' && 'Elevated Access Required'}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {requiredRole === 'admin' && 'You need admin privileges to access this page.'}
                {requiredRole === 'owner' && 'You need owner privileges to access this page.'}
                {requiredRole === 'elevated' && 'You need admin or owner privileges to access this page.'}
              </p>
              
              <div className="text-sm text-muted-foreground">
                <p>Current role: {isAdmin ? 'Admin' : isOwner ? 'Owner' : 'User'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
