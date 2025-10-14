# Firebase Setup Guide for UrbanNest

This guide will help you set up Firebase Authentication and Firestore for the UrbanNest application.

## Prerequisites

- A Google account
- Node.js and npm installed
- The UrbanNest project set up

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `urbannest` (or your preferred name)
4. Enable Google Analytics (optional, but recommended)
5. Choose or create a Google Analytics account
6. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Set up Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll update security rules later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 4: Get Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname (e.g., "UrbanNest Web")
5. Copy the Firebase configuration object

## Step 5: Update Firebase Configuration

1. Open `src/lib/firebase.ts` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## Step 6: Deploy Firestore Security Rules

1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your Firebase project
   - Use the existing `firestore.rules` file
   - Use the existing `firestore.indexes.json` file (or create a new one)

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your app and try to:
   - Register a new account
   - Login with the account
   - Check if user data is stored in Firestore

## Database Structure

The application uses the following Firestore collections:

### Users Collection (`/users/{userId}`)
```javascript
{
  uid: string,
  email: string,
  name: string,
  likedProperties: string[], // Array of property IDs
  createdAt: Date,
  role?: string // Optional: 'admin', 'owner', 'user'
}
```

### Properties Collection (`/properties/{propertyId}`)
```javascript
{
  title: string,
  location: string,
  price: string,
  gender: string,
  foodIncluded: boolean,
  verified: boolean,
  roomType: string,
  rating: number,
  amenities: string[],
  ownerId: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection (`/bookings/{bookingId}`)
```javascript
{
  userId: string,
  propertyId: string,
  ownerId: string,
  startDate: Date,
  endDate: Date,
  amount: number,
  status: string, // 'pending', 'confirmed', 'cancelled'
  createdAt: Date
}
```

## Security Rules

The provided `firestore.rules` file includes:

- Users can only read/write their own user document
- Properties are publicly readable but require authentication to write
- Users can only access their own favorites and bookings
- Reviews are publicly readable but require authentication to write
- Admin functions are restricted to users with admin role

## Free Tier Limits

Firebase offers generous free tier limits:

- **Authentication**: 10,000 verifications per month
- **Firestore**: 
  - 1 GB storage
  - 50,000 reads per day
  - 20,000 writes per day
  - 20,000 deletes per day
- **Hosting**: 10 GB storage, 10 GB transfer per month

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/network-request-failed)"**
   - Check your internet connection
   - Verify Firebase configuration is correct

2. **"Firebase: Error (auth/invalid-email)"**
   - Ensure email format is valid
   - Check if email/password authentication is enabled

3. **"Firebase: Error (permission-denied)"**
   - Check Firestore security rules
   - Ensure user is authenticated
   - Verify user has proper permissions

4. **"Firebase: Error (auth/user-not-found)"**
   - User doesn't exist in Firebase Auth
   - Check if user is trying to sign in with correct email

### Getting Help:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow Firebase Tag](https://stackoverflow.com/questions/tagged/firebase)

## Next Steps

After setting up Firebase:

1. Test user registration and login
2. Verify user data is stored in Firestore
3. Test the favorites functionality
4. Set up proper error handling
5. Consider adding email verification
6. Implement password reset functionality
7. Add user profile management
8. Set up proper admin roles and permissions

## Production Considerations

Before going to production:

1. Update Firestore rules to be more restrictive
2. Set up proper error monitoring
3. Implement rate limiting
4. Set up backup strategies
5. Monitor usage against free tier limits
6. Consider upgrading to a paid plan if needed
7. Implement proper logging and analytics
