// MonitoringPage.jsx
import React, { useEffect, useState } from "react";
import UserController from "../Controller/UserController";
import MonitoringController from "../Controller/MonitoringController";
import "../Pages/css/monitoring.css";

const MonitoringPage = () => {
  const [content, setContent] = useState(null);
  const [victimPrintable, setVictimPrintable] = useState(true); // Nueva variable de estado
  const [attackerPrintable, setAttackerPrintable] = useState(true); // Nueva variable de estado

  useEffect(() => {
    if (victimPrintable) {
      setContent(
        <div>
          <h2>Registrar Victima</h2>
          <hr />
          <UserController
            role="victima"
            setVictimPrintable={setVictimPrintable}
          />{" "}
          {/* Pasar isSet y setIsSet */}
        </div>
      );
    } else if (attackerPrintable) {
      setContent(
        <div>
          <h2>Registrar Agresor</h2>
          <hr />
          <UserController
            role="agresor"
            setAttackerPrintable={setAttackerPrintable}
          />{" "}
          {/* Pasar isSet y setIsSet */}
        </div>
      );
    } else {
      setContent(
        <div>
          <h2>Registrar Monitoreo</h2>
          <hr />
          <MonitoringController /> {/* Pasar isSet y setIsSet */}
        </div>
      );
    }
  }, [victimPrintable, attackerPrintable]); // Dependiendo de isSet

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
