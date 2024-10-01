

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDoCPGrLH_V2Dk3vAEFIohDFRVVU4k6kgo",
    authDomain: "chat-react-ecb1f.firebaseapp.com",
    projectId: "chat-react-ecb1f",
    storageBucket: "chat-react-ecb1f.appspot.com",
    messagingSenderId: "997060114719",
    appId: "1:997060114719:web:1b36566b76acb77577d82a",
    measurementId: "G-P2TZ9J1JSB",
  };
  
  export const app = initializeApp(firebaseConfig);
  export const database  = getFirestore(app)