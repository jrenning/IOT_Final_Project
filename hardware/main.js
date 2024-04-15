// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const dotenv = require("dotenv")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

dotenv.config()

console.log(process.env)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "iot-final-3f563.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: "iot-final-3f563",
  storageBucket: "iot-final-3f563.appspot.com",
  messagingSenderId: "103877995495",
  appId: "1:103877995495:web:2bf298b8b2fee1ce0a6b42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
