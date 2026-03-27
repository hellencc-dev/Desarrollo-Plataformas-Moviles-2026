import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBN9JPuZPmz_uRR3QaUlF1eaXK3Lt2ldLM",
  authDomain: "challenge-06-a9101.firebaseapp.com",
  projectId: "challenge-06-a9101",
  storageBucket: "challenge-06-a9101.firebasestorage.app",
  messagingSenderId: "527056818320",
  appId: "1:527056818320:web:97289b0c0b6653875f4815",
  databaseURL: "https://challenge-06-a9101-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { app, auth, db, realtimeDb };