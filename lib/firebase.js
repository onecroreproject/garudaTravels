// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

// Initialize Firestore with persistence
let db;
if (typeof window !== 'undefined') {
  // Client-side initialization with persistence
  db = initializeFirestore(app, {
    experimentalForceLongPolling: false,
    experimentalAutoDetectLongPolling: false,
    useFetchStreams: false
  });
  
  // Enable persistence
  enableIndexedDbPersistence(db, { 
    forceOwnership: true 
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Offline persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('This browser does not support offline persistence');
    } else {
      console.error('Error enabling persistence:', err);
    }
  });
} else {
  // Server-side initialization
  db = initializeFirestore(app, {});
}

// Initialize Storage
const storage = getStorage(app);

export { db, storage };