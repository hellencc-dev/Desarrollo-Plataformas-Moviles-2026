import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSW6LeNmVNQ9KVJ9IuuFSYV6DDl0Z7Ojo",
  authDomain: "parcial2-cd44b.firebaseapp.com",
  projectId: "parcial2-cd44b",
  storageBucket: "parcial2-cd44b.firebasestorage.app",
  messagingSenderId: "250204183836",
  appId: "1:250204183836:web:7524f341721843a5e3eed9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };