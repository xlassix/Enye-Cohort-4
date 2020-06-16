import * as firebase from 'firebase/app';
// Required for side-effects
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
// Initialize Cloud Firestore through Firebase
 firebase.initializeApp({
  apiKey: "AIzaSyDUn2si-t1m_jJw5_qHiRuWEoS_NVgCqWg",
  authDomain: "clear-practice-251418.firebaseapp.com",
  databaseURL: "https://clear-practice-251418.firebaseio.com",
  projectId: "clear-practice-251418",
  storageBucket: "clear-practice-251418.appspot.com",
  messagingSenderId: "622802772797",
  appId: "1:622802772797:web:658468920020d88a5fdb54",
  measurementId: "G-T84Z1ZDKPY"
});
export const db  = firebase.firestore();
export  const auth  = firebase.auth();



