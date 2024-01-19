import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDv8bQkmv4p_xWdyOFw5EykHsSGsK_W2Q0",
    authDomain: "prueba-d23e0.firebaseapp.com",
    projectId: "prueba-d23e0",
    storageBucket: "prueba-d23e0.appspot.com",
    messagingSenderId: "190331294393",
    appId: "1:190331294393:web:1bc44529ab86c6f7d30168",
    measurementId: "G-E6Y41HFVVY",
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

async function getTokenFromMessaging() {
  return await getToken(messaging, {
    vapidKey: "your-vapid-key",
  });
}

export { messaging, getTokenFromMessaging };