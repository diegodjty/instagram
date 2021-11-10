// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOt1d1IzyZr2un4HF4OA7r280t4tTYoJk",
  authDomain: "instagram-clone-34b76.firebaseapp.com",
  projectId: "instagram-clone-34b76",
  storageBucket: "instagram-clone-34b76.appspot.com",
  messagingSenderId: "348850473396",
  appId: "1:348850473396:web:7b6784f939a25ab4d60ae1"
};

// Initialize Firebase
const app = !getApps().length  ? initializeApp(firebaseConfig): getApp()
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}