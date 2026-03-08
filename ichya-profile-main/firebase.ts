import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmDbXvk3sKvSQbK_x9sBC0mhzF7rw5tko",
  authDomain: "labirin-dfs.firebaseapp.com",
  projectId: "labirin-dfs",
  storageBucket: "labirin-dfs.firebasestorage.app",
  messagingSenderId: "645485553724",
  appId: "1:645485553724:web:2eae7fa450858cc67ffb39",
  measurementId: "G-1Q2BJRE5WX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);