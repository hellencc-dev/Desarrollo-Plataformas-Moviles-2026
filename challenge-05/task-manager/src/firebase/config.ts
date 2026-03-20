import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8JrWwAD6iBmD2RITlOase4E7SPBC0AR8",
  authDomain: "challenge-05-978bb.firebaseapp.com",
  projectId: "challenge-05-978bb",
  storageBucket: "challenge-05-978bb.firebasestorage.app",
  messagingSenderId: "620134218131",
  appId: "1:620134218131:web:a3b5bb7c599c21b4475066"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };