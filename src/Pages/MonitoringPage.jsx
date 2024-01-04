// MonitoringPage.jsx
import React, { useEffect, useState } from "react";
import UserController from "../Controller/UserController";
import MonitoringController from "../Controller/MonitoringController";
import "../Pages/css/monitoring.css";

const MonitoringPage = () => {
  const [content, setContent] = useState(null);
  const [victimPrintable, setVictimPrintable] = useState(localStorage.getItem('victimDataSent') !== 'true');
  const [attackerPrintable, setAttackerPrintable] = useState(localStorage.getItem('attackerDataSent') !== 'true');
  const [currentView, setCurrentView] = useState('victim');

  const resetData = () => {
    localStorage.removeItem('attackerDataSent');
    localStorage.removeItem('victimDataSent');
    setAttackerPrintable(true);
    setVictimPrintable(true);
    setCurrentView('victim');
  };

  useEffect(() => {
    if (victimPrintable) {
      setCurrentView('victim');
    } else if (attackerPrintable) {
      setCurrentView('attacker');
    } else {
      setCurrentView('monitoring');
    }
  }, [victimPrintable, attackerPrintable]);

  useEffect(() => {
    if (currentView === 'victim') {
      setContent(
        <div>
          <h2>Registrar Victima</h2>
          <hr />
          <UserController
            role="victima"
            setVictimPrintable={(value) => {
              setVictimPrintable(value);
              localStorage.setItem('victimDataSent', !value);
            }}
          />
        </div>
      );
    } else if (currentView === 'attacker') {
      setContent(
        <div>
          <h2>Registrar Agresor</h2>
          <hr />
          <UserController
            role="agresor"
            setAttackerPrintable={(value) => {
              setAttackerPrintable(value);
              localStorage.setItem('attackerDataSent', !value);
            }}
          />
        </div>
      );
    } else {
      setContent(
        <div>
          <h2>Registrar Monitoreo</h2>
          <hr />
          <MonitoringController />
        </div>
      );
    }
  }, [currentView]);

  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <h1>Datos de Monitoreo</h1>
          <br />
          {content}
        </div>
          <button style={{marginLeft:"20px",marginBlockEnd:'20px', width: '100px' }} onClick={resetData}>Nuevo</button>
      </div>
      <br />
    </div>
  );
};

export default MonitoringPage;