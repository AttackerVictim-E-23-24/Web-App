// MonitoringPage.jsx
import React, { useEffect, useState, useContext } from "react";
import UserController from "../Controller/UserController";
import MonitoringController from "../Controller/MonitoringController";
import "../Pages/css/monitoring.css";
import UserModel from "../Model/UserModel";
import MonitoringModel from "../Model/MonitoringModel";
import GeneralContext from "../GeneralContext";

const MonitoringPage = () => {
  const views = ["victim", "attacker", "monitoring"];
  const [currentView, setCurrentView] = useState("victim");
  const { userVictim, userAttacker, monitoringData, setUserVictim, setUserAttacker, setMonitoringData } =
    useContext(GeneralContext);

  const resetData = () => {
    localStorage.removeItem("attackerDataSent");
    localStorage.removeItem("victimDataSent");
    setCurrentView("victim");
    setUserVictim(new UserModel());
    setUserAttacker(new UserModel());
    setMonitoringData(new MonitoringModel());
  };
  useEffect(() => {
    if (!userVictim.userName) {
      setCurrentView("victim");
    } else if (!userAttacker.userName) {
      setCurrentView("attacker");
    } else {
      setCurrentView("monitoring");
    }
  }, [userVictim, userAttacker]);

  return (
    <div className="main-container">
      <div className="content">
        <div className="controller-container">
          <h1>Monitoreo</h1>
          <hr />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                setCurrentView(
                  views[Math.max(0, views.indexOf(currentView) - 1)]
                )
              }
            >
              &lt;
            </button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button
                className={`myButton ${
                  currentView === "victim" ? "selected" : ""
                } ${userVictim?.userName && userAttacker?.userName ? "filled" : ""}`}
                onClick={() => setCurrentView("victim")}
              >
                Registrar Victima
              </button>
              <button
                className={`myButton ${
                  currentView === "attacker" ? "selected" : ""
                } ${userVictim?.userName && userAttacker?.userName ? "filled" : ""}`}
                onClick={() => setCurrentView("attacker")}
              >
                Registrar Agresor
              </button>
              <button
                className={`myButton ${
                  currentView === "monitoring" ? "selected" : ""
                } ${monitoringData?.frequency ? "filled" : ""}`}
                onClick={() => setCurrentView("monitoring")}
              >
                Registrar Monitoreo
              </button>
            </div>
            <button
              onClick={() =>
                setCurrentView(
                  views[
                    Math.min(views.length - 1, views.indexOf(currentView) + 1)
                  ]
                )
              }
            >
              &gt;
            </button>
          </div>

          <div className={`fade ${currentView}`}>
            {currentView === "victim" && <UserController role="victima"  />}
            {currentView === "attacker" && <UserController role="agresor" />}
            {currentView === "monitoring" && <MonitoringController />}
          </div>
        </div>
        <br />
        <button
          style={{ marginLeft: "20px", marginBlockEnd: "20px", width: "100px" }}
          onClick={resetData}
        >
          Nuevo
        </button>
      </div>
      <br />
    </div>
  );
};

export default MonitoringPage;
