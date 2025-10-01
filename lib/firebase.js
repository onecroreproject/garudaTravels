// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBBUqyW5VBXMnFVu2I41_c8HCdQ7O9T88w",
  authDomain: "garuda-nextjs-98b70.firebaseapp.com",
  projectId: "garuda-nextjs-98b70",
  storageBucket: "garuda-nextjs-98b70.firebasestorage.app",
  messagingSenderId: "775115944646",
  appId: "1:775115944646:web:2a18a159a6f3f4a4b35dc7",
  measurementId: "G-TB5YE02FYH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Enable offline persistence in browser environment
if (typeof window !== 'undefined') {
  const enablePersistence = async () => {
    try {
      await enableIndexedDbPersistence(db, {
        forceOwnership: true,
        synchronizeTabs: true
      });
      console.log('Firestore persistence enabled');
    } catch (error) {
      if (error.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (error.code === 'unimplemented') {
        console.warn("The current browser doesn't support all features required for persistence");
      } else {
        console.error('Error enabling persistence:', error);
      }
    }
  };

  // Add a small delay before enabling persistence
  setTimeout(enablePersistence, 1000);
}

// Export initialized instances
export { app, db, storage, auth };

export default { app, db, storage, auth };