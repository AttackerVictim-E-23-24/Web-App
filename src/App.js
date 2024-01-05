// App.js
import React, { useState, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import MonitoringPage from "./Pages/MonitoringPage";
import Sidebar from "./Pages/sidebar";
import PasswordRecovery from "./Pages/PasswordRecovery";
import PasswordChange from "./Pages/PasswordChange";
import SecurityZonePage from "./Pages/SecurityZonePage";
import FollowUpPage from "./Pages/FollowUpPage";
import UserModel from "./Model/UserModel";
import MonitoringModel from "./Model/MonitoringModel";
import useLoginModel from "./Model/LoginModel";

const App = () => {
  const { loginData, setLoginData } = useLoginModel();

  const [userVictim, setUserVictim] = useState(() => {
    const savedUser = localStorage.getItem(`userVictim_${loginData.username}`);
    return savedUser
      ? JSON.parse(savedUser)
      : new UserModel(
          "John",
          "Doe",
          "Doe",
          "Doe",
          new Date(),
          "default cedula",
          "default username",
          "default password",
          "default email",
          "default role",
          "default imei",
          "default userTypeDto",
          "default direccion",
          new Date()
        );
  });

  useEffect(() => {
    if (loginData.username) {
      localStorage.setItem(
        `userVictim_${loginData.username}`,
        JSON.stringify(userVictim)
      );
    }
  }, [userVictim, loginData.username]);

  const [userAttacker, setUserAttacker] = useState(() => {
    const savedUser = localStorage.getItem(
      `userAttacker_${loginData.username}`
    );
    return savedUser
      ? JSON.parse(savedUser)
      : new UserModel(
          "John",
          "Doe",
          "Doe",
          "Doe",
          new Date(),
          "default cedula",
          "default username",
          "default password",
          "default email",
          "default role",
          "default imei",
          "default userTypeDto",
          "default direccion",
          new Date()
        );
  });

  useEffect(() => {
    if (loginData.username) {
      localStorage.setItem(
        `userAttacker_${loginData.username}`,
        JSON.stringify(userAttacker)
      );
    }
  }, [userAttacker, loginData.username]);

  const [monitoringData, setMonitoringData] = useState(() => {
    const savedData = localStorage.getItem(
      `monitoringData_${loginData.username}`
    );
    return savedData
      ? JSON.parse(savedData)
      : new MonitoringModel(
          1,
          new Date(),
          "default frequency",
          "default downtime",
          "default offlineTime",
          "default minDistance",
          "default record",
          new Date()
        );
  });

  useEffect(() => {
    if (loginData.username) {
      localStorage.setItem(
        `monitoringData_${loginData.username}`,
        JSON.stringify(monitoringData)
      );
    }
  }, [monitoringData, loginData.username]);
  console.log("monitoringData", loginData.username);

  return (
    <GeneralContext.Provider
      value={{
        userVictim,
        setUserVictim,
        userAttacker,
        setUserAttacker,
        monitoringData,
        setMonitoringData,
        loginData, // Agrega loginData al contexto
        setLoginData
      }}
    >
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <div>
                  <Sidebar />
                  <HomePage />
                </div>
              }
            />
            <Route
              path="/monitoring"
              element={
                <div>
                  <Sidebar />
                  <MonitoringPage />
                </div>
              }
            />
            <Route
              path="/security-zone"
              element={
                <div>
                  <Sidebar />
                  <SecurityZonePage />
                </div>
              }
            />
            <Route
              path="/follow-up"
              element={
                <div>
                  <Sidebar />
                  <FollowUpPage />
                </div>
              }
            />
            <Route path="/recover-password" element={<PasswordRecovery />} />
            <Route path="/change-password" element={<PasswordChange />} />
            <Route path="/" element={<Navigate to="/login" />} />{" "}
            {/* Redirige de la ruta raíz a /login */}
            {/* Aquí puedes agregar más rutas si lo necesitas */}
          </Routes>
        </div>
      </Router>
    </GeneralContext.Provider>
  );
};

export default App;
