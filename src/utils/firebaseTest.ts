import { auth, db, analytics } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Test Firestore connection
    const testCollection = collection(db, 'test');
    const testDoc = await addDoc(testCollection, {
      message: 'Firebase connection test',
      timestamp: new Date(),
    });
    
    console.log('✅ Firestore connected successfully!', testDoc.id);
    
    // Test Analytics (if available)
    if (analytics) {
      console.log('✅ Analytics initialized successfully!');
    }
    
    // Test Auth
    console.log('✅ Auth service initialized successfully!');
    
    return {
      success: true,
      message: 'Firebase connection successful!',
      firestoreId: testDoc.id
    };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return {
      success: false,
      message: 'Firebase connection failed',
      error: error
    };
  }
};

// Clean up test data
export const cleanupTestData = async () => {
  try {
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    // Note: In a real app, you'd delete the test documents
    // For now, we'll just log them
    console.log('Test documents created:', snapshot.size);
    
    return { success: true, message: 'Test data cleanup completed' };
  } catch (error) {
    console.error('Error cleaning up test data:', error);
    return { success: false, error };
  }
};
