// Firebase script to set up initial roles
// Run with: node scripts/setup-roles.js

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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

async function setupRoles() {
  try {
    console.log('🔥 Setting up role collections...');
    
    // Set up admin emails
    await setDoc(doc(db, 'roles', 'adminEmails'), {
      emails: [
        'your-email@example.com',  // Replace with your email
        'admin2@example.com'        // Add more admin emails here
      ]
    });
    console.log('✅ Admin emails set up');
    
    // Set up owner emails
    await setDoc(doc(db, 'roles', 'ownerEmails'), {
      emails: [
        'owner1@example.com',       // Add owner emails here
        'owner2@example.com'
      ]
    });
    console.log('✅ Owner emails set up');
    
    console.log('🎉 Role setup complete!');
    console.log('You can now login with admin emails to access the admin dashboard.');
    
  } catch (error) {
    console.error('❌ Error setting up roles:', error);
  }
}

setupRoles();
