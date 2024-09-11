import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyA57xO6--AzFtDeJl_ylhKVsyVz54sh0jE",
  authDomain: "word-flow-1c699.firebaseapp.com",
  projectId: "word-flow-1c699",
  storageBucket: "word-flow-1c699.appspot.com",
  messagingSenderId: "566923991369",
  appId: "1:566923991369:web:0dce32df368594ae0d2298",
  measurementId: "G-71NS0J9SH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);
