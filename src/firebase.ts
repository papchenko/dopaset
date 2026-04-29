import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7glb8L6rbn3FWNExGoLhUZw-r8mK-TE4",
  authDomain: "dopaset.firebaseapp.com",
  projectId: "dopaset",
  storageBucket: "dopaset.firebasestorage.app",
  messagingSenderId: "980218193450",
  appId: "1:980218193450:web:d4f631ae73871df4ac4553",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);