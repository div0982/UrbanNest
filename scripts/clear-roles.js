// Clear existing role collections
// Run with: node scripts/clear-roles.js

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

async function clearRoles() {
  try {
    console.log('🔥 Clearing existing role collections...');
    
    // Clear admin emails
    await setDoc(doc(db, 'roles', 'adminEmails'), {
      emails: []
    });
    console.log('✅ Cleared admin emails');
    
    // Clear owner emails
    await setDoc(doc(db, 'roles', 'ownerEmails'), {
      emails: []
    });
    console.log('✅ Cleared owner emails');
    
    console.log('');
    console.log('🎉 Role collections cleared!');
    console.log('');
    console.log('📋 Now when you register with diveshasenthil@gmail.com:');
    console.log('1. It will automatically be added to admin list');
    console.log('2. You will have full admin access');
    console.log('3. You can manage other roles from the admin dashboard');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

clearRoles();
