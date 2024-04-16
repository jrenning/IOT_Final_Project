// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration

import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "dotenv/config"


export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "iot-final-3f563.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: "iot-final-3f563",
  storageBucket: "iot-final-3f563.appspot.com",
  messagingSenderId: "103877995495",
  appId: "1:103877995495:web:0ebb214923903f4a0a6b42",
};

console.log(firebaseConfig)

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
//@ts-ignore
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);


