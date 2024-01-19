import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTokenFromMessaging } from '../Model/FirebaseConfig';

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      getTokenFromMessaging()
        .then((currentToken) => {
          if (currentToken) {
            console.log("currentToken", currentToken);
            // Show the token as a toast notification
            toast(`Token: ${currentToken}`, {
              position: "top-right",
              autoClose: 5000, // The toast will disappear after 5 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
    } 
  });
}

// Listen for messages from the service worker
navigator.serviceWorker.addEventListener('message', (event) => {
  // Show a toast with the content of the message
  toast(event.data.notification.body, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
});

export { requestPermission };