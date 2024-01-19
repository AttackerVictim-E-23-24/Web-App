// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { toast } from 'react-toastify';

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

function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
  
        // Add the public key generated from the console here.
        getToken(messaging, {
          vapidKey:
            "BAjCGL0kdRNFOziqNbjDn7ie8b20vOGlKonKizr0i-0H1rC5tjh-vrg2JTQ2n7Gx3ZaVEuqeIjbYHN7ykZzhCCA",
        })
          .then((currentToken) => {
            if (currentToken) {
              // Send the token to your server and update the UI if necessary
              // ...
              console.log("currentToken", currentToken);
  
              // Show a toast notification
              toast(`Token: ${currentToken}`);
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
              // ...
            }
          })
      }
    });
  }

async function getTokenFromMessaging() {
  return await getToken(messaging, {
    vapidKey: "BAjCGL0kdRNFOziqNbjDn7ie8b20vOGlKonKizr0i-0H1rC5tjh-vrg2JTQ2n7Gx3ZaVEuqeIjbYHN7ykZzhCCA",
  });
}
  
export { messaging, requestPermission, getTokenFromMessaging };