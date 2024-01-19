import React, { useState, useEffect } from 'react';
import { getTokenFromMessaging } from '../Model/FirebaseConfig';

function useAlertsController() {
  const [messages, setMessages] = useState([]);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
  
        getTokenFromMessaging()
          .then((currentToken) => {
            if (currentToken) {
              console.log("currentToken", currentToken);
              // Check if the token is already in the messages array
              if (!messages.includes(`Token: ${currentToken}`)) {
                // Add the token to the messages array
                setMessages((prevMessages) => [...prevMessages, `Token: ${currentToken}`]);
              }
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
  useEffect(() => {
    const handler = (event) => {
      // Add the content of the message to the messages array
      const messageContent = `Received background message: ${event.data.notification.body}`;
      setMessages((prevMessages) => [...prevMessages, messageContent]);
    };
  
    navigator.serviceWorker.addEventListener('message', handler);
  
    // Clean up the event listener when the component is unmounted
    return () => {
      navigator.serviceWorker.removeEventListener('message', handler);
    };
  }, []);

  // Listen for messages from the service worker
useEffect(() => {
    // Create a new BroadcastChannel
    const channel = new BroadcastChannel('sw-messages');
  
    // Listen for messages
    channel.onmessage = (event) => {
      // Add the content of the message to the messages array
      const messageTitle = <h3>{event.data.notification.title}</h3>;
const messageBody = <p>{event.data.notification.body}</p>;
const messageContent = [messageTitle, messageBody];
      setMessages((prevMessages) => [...prevMessages, messageContent]);
    };
  
    // Clean up the event listener when the component is unmounted
    return () => {
      channel.close();
    };
  }, []);

  return { messages, requestPermission };
}

export default useAlertsController;