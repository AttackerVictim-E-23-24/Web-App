// Import Firebase
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

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
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  // Create a new BroadcastChannel
  const channel = new BroadcastChannel('sw-messages');
  // Send the payload to the channel
  channel.postMessage(payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
