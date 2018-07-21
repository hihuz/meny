const config = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBTC9UWfG4_NP7Bhu5wUBULywjTdnyav9M",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "menydemo-395c0.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DB_URL || "https://menydemo-395c0.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "menydemo-395c0",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "menydemo-395c0.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_ID || "918378831114"
};

export default config;
