// FollowUpPage.jsx
import React from "react";
//import GeneralContext from "../GeneralContext";
import PointController from "../Controller/PointController";
//import FollowUpController from "../Controller/FollowUpController";
//import "../Pages/css/FollowUp.css";

const FollowUpPage = () => {


  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <PointController />
          <br />
        </div>
      </div>
      <br />
    </div>
  );
};

export default FollowUpPage;
