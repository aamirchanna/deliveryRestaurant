import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import {   getStorage,
    ref,
    uploadBytes,
    getDownloadURL, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";


  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc
  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
  

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA6AaAGh-K1GTOSvKcEw8x8Eowlrp2NDqM",
    authDomain: "food-delivery-eb5fb.firebaseapp.com",
    projectId: "food-delivery-eb5fb",
    storageBucket: "food-delivery-eb5fb.appspot.com",
    messagingSenderId: "271486277774",
    appId: "1:271486277774:web:6b3074b4a986ffa333d1df",
    measurementId: "G-W31TJ0CSKG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export {
    auth,
    db,
    getStorage,
    storage,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    signOut,
    getDoc,
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    deleteDoc
  };