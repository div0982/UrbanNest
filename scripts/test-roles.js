// Test role system
// Run with: node scripts/test-roles.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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

async function testRoles() {
  try {
    console.log('🔥 Testing role collections...');
    
    // Check admin emails
    const adminDoc = await getDoc(doc(db, 'roles', 'adminEmails'));
    if (adminDoc.exists()) {
      const adminEmails = adminDoc.data().emails || [];
      console.log('✅ Admin emails:', adminEmails);
    } else {
      console.log('❌ Admin emails document not found');
    }
    
    // Check owner emails
    const ownerDoc = await getDoc(doc(db, 'roles', 'ownerEmails'));
    if (ownerDoc.exists()) {
      const ownerEmails = ownerDoc.data().emails || [];
      console.log('✅ Owner emails:', ownerEmails);
    } else {
      console.log('❌ Owner emails document not found');
    }
    
    console.log('');
    console.log('📋 Test your roles:');
    console.log('1. Register with diveshasenthil@gmail.com → Should be admin');
    console.log('2. Register with any other email + "PG Owner" → Should be owner');
    console.log('3. Register with any other email + "PG Searcher" → Should be normal user');
    
  } catch (error) {
    console.error('❌ Error testing roles:', error);
  }
}

testRoles();
