// Quick setup script - Replace YOUR_EMAIL with your actual email
// Run with: node scripts/quick-setup.js

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

async function quickSetup() {
  try {
    console.log('🔥 Setting up Firestore role collections...');
    
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL EMAIL
    const YOUR_EMAIL = 'diveshasenthil@gmail.com'; // 👈 CHANGE THIS!
    
    if (YOUR_EMAIL === 'diveshasenthil@gmail.com') {
      console.log('❌ Please edit the script and replace YOUR_EMAIL with your actual email');
      console.log('📝 Edit scripts/quick-setup.js and change line 25');
      return;
    }
    
    // Set up admin emails
    await setDoc(doc(db, 'roles', 'adminEmails'), {
      emails: [YOUR_EMAIL]
    });
    console.log(`✅ Added ${YOUR_EMAIL} as admin`);
    
    // Set up owner emails (empty initially)
    await setDoc(doc(db, 'roles', 'ownerEmails'), {
      emails: []
    });
    console.log('✅ Owner emails document created');
    
    console.log('');
    console.log('🎉 Setup complete!');
    console.log('');
    console.log('📋 You can now:');
    console.log('1. Login with your admin email');
    console.log('2. Access admin dashboard at /admin-dashboard');
    console.log('3. Manage roles from the "Roles" tab');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

quickSetup();
