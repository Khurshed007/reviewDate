// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Ваши настройки Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoCPGrLH_V2Dk3vAEFIohDFRVVU4k6kgo",
  authDomain: "chat-react-ecb1f.firebaseapp.com",
  projectId: "chat-react-ecb1f",
  storageBucket: "chat-react-ecb1f.appspot.com",
  messagingSenderId: "997060114719",
  appId: "1:997060114719:web:1b36566b76acb77577d82a",
  measurementId: "G-P2TZ9J1JSB",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };