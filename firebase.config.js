// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqmBVD-JHXeUyzTpDTmfDYecjLeGfKaSs",
  authDomain: "terraquest-2bf8a.firebaseapp.com",
  projectId: "terraquest-2bf8a",
  storageBucket: "terraquest-2bf8a.appspot.com",
  messagingSenderId: "494383421243",
  appId: "1:494383421243:web:802e883909852f560c091e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(app);