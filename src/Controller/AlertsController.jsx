import { getTokenFromMessaging } from '../Model/FirebaseConfig';
import { showToken } from '../View/AlertsView';

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      getTokenFromMessaging()
        .then((currentToken) => {
          if (currentToken) {
            console.log("currentToken", currentToken);
            showToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
    }
  });
}

export { requestPermission };