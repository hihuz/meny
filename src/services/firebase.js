const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBTC9UWfG4_NP7Bhu5wUBULywjTdnyav9M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "menydemo-395c0.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL || "https://menydemo-395c0.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "menydemo-395c0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "menydemo-395c0.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID || "918378831114"
};

export default config;
