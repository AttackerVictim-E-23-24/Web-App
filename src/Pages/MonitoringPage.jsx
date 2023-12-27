// MonitoringPage.jsx
import React, { useContext } from "react";
import GeneralContext from "../GeneralContext";
import NewUserController from "../Controller/UserController";
import MonitoringController from "../Controller/MonitoringController";
import "../Pages/css/monitoring.css";

const MonitoringPage = () => {
  const { userVictim, userAttacker, monitoringData } =
    useContext(GeneralContext);

  let content;

  if (!userVictim) {
    content = (
      <div>
      <h2>Registrar Victima</h2>
      <hr />
        <NewUserController role="victima" />
      </div>
    );
  } else if (!userAttacker) {
    content = (
      <div>
      <h2>Registrar Agresor</h2>
      <hr />
        <NewUserController role="agresor" />
      </div>
    );
  } else if (!monitoringData) {}
  
    content = (
      <div>
      <h2>Registrar Monitoreo</h2>
      <hr />
        <MonitoringController />
      </div>
    );


  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <h1>Datos de Monitoreo</h1>
          <br />
          {content}
        </div>
      </div>
      <br />
    </div>
  );
};

export default MonitoringPage;
