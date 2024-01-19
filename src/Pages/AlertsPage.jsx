import React, { useEffect } from "react";
import "../Model/FirebaseConfig";
import useAlertsController from "../Controller/AlertsController"; // Import the useAlertsController hook
import "../Pages/css/AlertsPage.css";

const AlertsPage = () => {
  const { messages, requestPermission } = useAlertsController(); // Use the useAlertsController hook

  useEffect(() => {
    requestPermission(); // Call the requestPermission function when the component is mounted
  }, []); // The empty array means this effect runs once on mount and not on updates

  return (
    <>
      <div className="main-container">
        <div className="content">
          <div className="">
            <br />
            <h1>Alertas</h1>
            <br />
            {messages &&
              messages.map((message, index) => (
                <div key={index} className="card">
                  {message}
                </div>
              ))}
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default AlertsPage;