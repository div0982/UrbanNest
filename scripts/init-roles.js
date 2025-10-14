// Initialize Firestore role collections
// Run with: node scripts/init-roles.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN5Ambz2H6R72FXADxNs8QktBCLspoanI",
  authDomain: "urbannest-a4c44.firebaseapp.com",
  projectId: "urbannest-a4c44",
  storageBucket: "urbannest-a4c44.firebasestorage.app",
  messagingSenderId: "706747089235",
  appId: "1:706747089235:web:ec08dd75fa025e03a0e1a6",
  measurementId: "G-BQMV57B3VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initializeRoles() {
  try {
    console.log('🔥 Initializing role collections in Firestore...');
    
    // Set up admin emails - REPLACE WITH YOUR EMAIL
    await setDoc(doc(db, 'roles', 'adminEmails'), {
      emails: [
        'your-email@example.com'  // ⚠️ REPLACE THIS WITH YOUR ACTUAL EMAIL
      ]
    });
    console.log('✅ Admin emails document created');
    
    // Set up owner emails (empty initially)
    await setDoc(doc(db, 'roles', 'ownerEmails'), {
      emails: []
    });
    console.log('✅ Owner emails document created');
    
    console.log('🎉 Role collections initialized successfully!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Replace "your-email@example.com" in the script with your actual email');
    console.log('2. Run the script again: node scripts/init-roles.js');
    console.log('3. Login with your admin email to test the system');
    
  } catch (error) {
    console.error('❌ Error initializing roles:', error);
    console.log('');
    console.log('💡 Make sure:');
    console.log('- You have internet connection');
    console.log('- Firebase project is set up correctly');
    console.log('- Firestore database is created');
  }
}

initializeRoles();
