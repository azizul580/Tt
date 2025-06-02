// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0xMxwVOyqgZut57URSjtK6BAKckm-JY4",
    authDomain: "casino-572a1.firebaseapp.com",
    projectId: "casino-572a1",
    storageBucket: "casino-572a1.firebasestorage.app",
    messagingSenderId: "369051252878",
    appId: "1:369051252878:web:cc10207570fc8be91ef1df",
    measurementId: "G-N6DYRYB308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };