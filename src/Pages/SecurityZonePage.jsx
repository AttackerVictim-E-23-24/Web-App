// SecurityZonePage.jsx
import React from "react";
//import GeneralContext from "../GeneralContext";
import MapController from "../Controller/MapController";
//import SecurityZoneController from "../Controller/SecurityZoneController";
//import "../Pages/css/SecurityZone.css";

const SecurityZonePage = () => {


  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <MapController canDrawPolygons={true}/>
          <br />
        </div>
      </div>
      <br />
    </div>
  );
};

export default SecurityZonePage;
