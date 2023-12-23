// MonitoringPage.jsx
import React from "react";
import "../Pages/css/monitoring.css";
import MapController from "../Controller/MapController";

const MonitoringPage = () => {
  return (
    <div className="main-container">
      <div className="content">
        <div className="user-view-container">
          <div className="login-page">
            <h1>Estas en monitoring</h1>
            <MapController canDrawPolygons={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
