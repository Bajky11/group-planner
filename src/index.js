import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuaN0XbXfLP2ArAtTdgZqYWvG56P-ZrvE",
  authDomain: "groupplanningcalendar-c754c.firebaseapp.com",
  projectId: "groupplanningcalendar-c754c",
  storageBucket: "groupplanningcalendar-c754c.appspot.com",
  messagingSenderId: "897501582141",
  appId: "1:897501582141:web:89cf16b489d8d8d6f5eb54",
  measurementId: "G-LKC5QKHESV",
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/group-planner/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
