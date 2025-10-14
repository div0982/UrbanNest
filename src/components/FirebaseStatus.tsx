import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const FirebaseStatus = () => {
  const [status, setStatus] = useState<{
    auth: 'loading' | 'connected' | 'error';
    firestore: 'loading' | 'connected' | 'error';
    testData: string | null;
  }>({
    auth: 'loading',
    firestore: 'loading',
    testData: null
  });

  const [testing, setTesting] = useState(false);

  useEffect(() => {
    // Test Auth connection
    const testAuth = () => {
      try {
        if (auth) {
          setStatus(prev => ({ ...prev, auth: 'connected' }));
        } else {
          setStatus(prev => ({ ...prev, auth: 'error' }));
        }
      } catch (error) {
        setStatus(prev => ({ ...prev, auth: 'error' }));
      }
    };

    // Test Firestore connection
    const testFirestore = async () => {
      try {
        const testCollection = collection(db, 'test');
        const testDoc = await addDoc(testCollection, {
          message: 'Firebase connection test',
          timestamp: new Date(),
        });
        
        setStatus(prev => ({ 
          ...prev, 
          firestore: 'connected',
          testData: testDoc.id 
        }));
      } catch (error) {
        console.error('Firestore test failed:', error);
        setStatus(prev => ({ ...prev, firestore: 'error' }));
      }
    };

    testAuth();
    testFirestore();
  }, []);

  const cleanupTestData = async () => {
    setTesting(true);
    try {
      const testCollection = collection(db, 'test');
      const snapshot = await getDocs(testCollection);
      
      // Delete test documents
      const deletePromises = snapshot.docs.map(docSnapshot => 
        deleteDoc(doc(db, 'test', docSnapshot.id))
      );
      
      await Promise.all(deletePromises);
      setStatus(prev => ({ ...prev, testData: null }));
    } catch (error) {
      console.error('Cleanup failed:', error);
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Loading...</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔥 Firebase Status
        </CardTitle>
        <CardDescription>
          Check your Firebase connection status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.auth)}
            <span className="font-medium">Authentication</span>
          </div>
          {getStatusBadge(status.auth)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.firestore)}
            <span className="font-medium">Firestore</span>
          </div>
          {getStatusBadge(status.firestore)}
        </div>
        
        {status.testData && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-700">
              ✅ Test data created: {status.testData}
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={cleanupTestData}
              disabled={testing}
              className="mt-2"
            >
              {testing ? 'Cleaning...' : 'Cleanup Test Data'}
            </Button>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>• Auth: Firebase Authentication service</p>
          <p>• Firestore: Cloud Firestore database</p>
          <p>• Test data is automatically created to verify connection</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FirebaseStatus;
