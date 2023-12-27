// FollowUpPage.jsx
import React from "react";
//import GeneralContext from "../GeneralContext";
import MapController from "../Controller/MapController";
//import FollowUpController from "../Controller/FollowUpController";
//import "../Pages/css/FollowUp.css";

const FollowUpPage = () => {


  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <MapController canDrawPolygons={false}/>
          <br />
        </div>
      </div>
      <br />
    </div>
  );
};

export default FollowUpPage;
