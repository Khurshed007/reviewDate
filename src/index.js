// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { store } from './store';
// import { Provider } from 'react-redux';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// <Provider store={store}>
//  <BrowserRouter>
//     <App />
//     </BrowserRouter>
//     </Provider>
// );




import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { setIsUser } from "./store/user";
import { setCurrentUser } from "./store/bewertung";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoCPGrLH_V2Dk3vAEFIohDFRVVU4k6kgo",
  authDomain: "chat-react-ecb1f.firebaseapp.com",
  projectId: "chat-react-ecb1f",
  storageBucket: "chat-react-ecb1f.appspot.com",
  messagingSenderId: "997060114719",
  appId: "1:997060114719:web:1b36566b76acb77577d82a",
  measurementId: "G-P2TZ9J1JSB",
};

// Initialize Firebase
let app;
let auth;
let fireStore;

// Create a context to be used throughout the application
export const Context = createContext(null);

const RootComponent = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Initialize Firebase and set the initialized state to true
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    fireStore = getFirestore(app);
    setFirebaseInitialized(true);
  }, []);

  useEffect(() => {
    // Load the user from localStorage and set it in the store
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      store.dispatch(setCurrentUser(storedUser));
    }
  }, []); // This effect will trigger only when the RootComponent mounts

  // Display a loading message until Firebase is initialized
  if (!firebaseInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <Context.Provider
        value={{
          firebaseApp: app,
          auth,
          fireStore,
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
};

// Render the RootComponent to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);