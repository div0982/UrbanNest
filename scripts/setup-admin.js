// Set up admin email in Firestore
// Run with: node scripts/setup-admin.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import readline from 'readline';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupAdmin() {
  try {
    console.log('🔥 Setting up admin access...');
    console.log('');
    
    const email = await askQuestion('Enter your admin email: ');
    
    if (!email || !email.includes('@')) {
      console.log('❌ Please enter a valid email address');
      rl.close();
      return;
    }
    
    console.log('');
    console.log('🔄 Adding your email to admin list...');
    
    // Get current admin emails
    const adminDoc = await getDoc(doc(db, 'roles', 'adminEmails'));
    const currentEmails = adminDoc.exists() ? adminDoc.data().emails || [] : [];
    
    // Add new email if not already present
    if (!currentEmails.includes(email)) {
      await setDoc(doc(db, 'roles', 'adminEmails'), {
        emails: [...currentEmails, email]
      });
      console.log(`✅ Added ${email} to admin list`);
    } else {
      console.log(`✅ ${email} is already an admin`);
    }
    
    console.log('');
    console.log('🎉 Admin setup complete!');
    console.log('');
    console.log('📋 You can now:');
    console.log('1. Login with your admin email');
    console.log('2. Access the admin dashboard at /admin-dashboard');
    console.log('3. Manage roles from the "Roles" tab');
    console.log('4. Add more admins and owners through the interface');
    
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
    console.log('');
    console.log('💡 Make sure:');
    console.log('- You have internet connection');
    console.log('- Firebase project is set up correctly');
    console.log('- Firestore database is created');
  } finally {
    rl.close();
  }
}

setupAdmin();
