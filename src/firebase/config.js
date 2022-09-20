// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuCJiYXkvDvphprx1uz8OpTf9R08IU1RU",
  authDomain: "journalnicolas-7e8bc.firebaseapp.com",
  projectId: "journalnicolas-7e8bc",
  storageBucket: "journalnicolas-7e8bc.appspot.com",
  messagingSenderId: "1048077285487",
  appId: "1:1048077285487:web:38993650963cadd1bfb59a"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp ); //Funcionalidades de autenticacion
export const FirebaseDB = getFirestore( FirebaseApp );//configuracion de mi base de datos