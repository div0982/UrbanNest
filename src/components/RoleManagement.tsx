import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/utils/roles';
import { Trash2, Plus, Shield, UserCheck } from 'lucide-react';

interface RoleData {
  emails: string[];
}

const RoleManagement = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [ownerEmails, setOwnerEmails] = useState<string[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Load current roles
  useEffect(() => {
    if (isAdmin) {
      loadRoles();
    }
  }, [isAdmin]);

  const loadRoles = async () => {
    try {
      setLoading(true);
      
      // Load admin emails
      const adminDoc = await getDoc(doc(db, 'roles', 'adminEmails'));
      if (adminDoc.exists()) {
        const adminData = adminDoc.data() as RoleData;
        setAdminEmails(adminData.emails || []);
      }
      
      // Load owner emails
      const ownerDoc = await getDoc(doc(db, 'roles', 'ownerEmails'));
      if (ownerDoc.exists()) {
        const ownerData = ownerDoc.data() as RoleData;
        setOwnerEmails(ownerData.emails || []);
      }
    } catch (error) {
      console.error('Error loading roles:', error);
      toast({
        title: "Error",
        description: "Failed to load role data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addRole = async (role: 'admin' | 'owner', email: string) => {
    if (!email.trim()) return;
    
    try {
      setLoading(true);
      const roleKey = `${role}Emails`;
      const currentEmails = role === 'admin' ? adminEmails : ownerEmails;
      
      if (currentEmails.includes(email)) {
        toast({
          title: "Warning",
          description: `${email} already has ${role} role`,
          variant: "destructive",
        });
        return;
      }
      
      const newEmails = [...currentEmails, email];
      await setDoc(doc(db, 'roles', roleKey), { emails: newEmails });
      
      if (role === 'admin') {
        setAdminEmails(newEmails);
      } else {
        setOwnerEmails(newEmails);
      }
      
      toast({
        title: "Success",
        description: `${email} added as ${role}`,
      });
      
      // Clear input
      if (role === 'admin') {
        setNewAdminEmail('');
      } else {
        setNewOwnerEmail('');
      }
    } catch (error) {
      console.error(`Error adding ${role}:`, error);
      toast({
        title: "Error",
        description: `Failed to add ${role} role`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeRole = async (role: 'admin' | 'owner', email: string) => {
    try {
      setLoading(true);
      const roleKey = `${role}Emails`;
      const currentEmails = role === 'admin' ? adminEmails : ownerEmails;
      const newEmails = currentEmails.filter(e => e !== email);
      
      await setDoc(doc(db, 'roles', roleKey), { emails: newEmails });
      
      if (role === 'admin') {
        setAdminEmails(newEmails);
      } else {
        setOwnerEmails(newEmails);
      }
      
      toast({
        title: "Success",
        description: `${email} removed from ${role} role`,
      });
    } catch (error) {
      console.error(`Error removing ${role}:`, error);
      toast({
        title: "Error",
        description: `Failed to remove ${role} role`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-muted-foreground">
            You need admin privileges to manage roles.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Role Management
          </CardTitle>
          <CardDescription>
            Manage admin and owner roles for the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Admin Management */}
          <div>
            <Label className="text-base font-medium">Admin Users</Label>
            <div className="mt-2 space-y-2">
              {adminEmails.map((email) => (
                <div key={email} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-mono text-sm">{email}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeRole('admin', email)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter admin email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRole('admin', newAdminEmail)}
                />
                <Button
                  onClick={() => addRole('admin', newAdminEmail)}
                  disabled={loading || !newAdminEmail.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Owner Management */}
          <div>
            <Label className="text-base font-medium">Owner Users</Label>
            <div className="mt-2 space-y-2">
              {ownerEmails.map((email) => (
                <div key={email} className="flex items-center justify-between p-2 border rounded">
                  <span className="font-mono text-sm">{email}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeRole('owner', email)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter owner email"
                  value={newOwnerEmail}
                  onChange={(e) => setNewOwnerEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRole('owner', newOwnerEmail)}
                />
                <Button
                  onClick={() => addRole('owner', newOwnerEmail)}
                  disabled={loading || !newOwnerEmail.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Role Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Admin Role</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access to admin dashboard</li>
                <li>• Manage user roles</li>
                <li>• View all properties and bookings</li>
                <li>• Platform analytics and reports</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Owner Role</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Access to owner dashboard</li>
                <li>• List and manage properties</li>
                <li>• View bookings for their properties</li>
                <li>• Property analytics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;
