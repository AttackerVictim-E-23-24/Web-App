// SecurityZonePage.jsx
import React from "react";
//import GeneralContext from "../GeneralContext";
import PolygonController from '../Controller/PolygonController';
//import SecurityZoneController from "../Controller/SecurityZoneController";
//import "../Pages/css/SecurityZone.css";

const SecurityZonePage = () => {


  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <PolygonController/>
          <br />
        </div>
      </div>
      <br />
    </div>
  );
};

export default SecurityZonePage;
