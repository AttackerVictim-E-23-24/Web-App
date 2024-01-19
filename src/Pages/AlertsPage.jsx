import React, { useEffect } from "react";
import "../Model/FirebaseConfig";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { requestPermission } from '../Controller/AlertsController'; // Import the requestPermission function

const AlertsPage = () => {
  useEffect(() => {
    requestPermission(); // Call the requestPermission function when the component is mounted
  }, []); // The empty array means this effect runs once on mount and not on updates

  return (
    <>
      <ToastContainer />
      <div className="main-container">
        <div className="content">
          <div className="controller-container">
            <br />
            <h1>Alertas</h1>
            <br />
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default AlertsPage;