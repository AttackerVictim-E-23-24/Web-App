// App.js
import React, { useState } from 'react';
import GeneralContext from './GeneralContext';
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
import PasswordRecovery from './Pages/PasswordRecovery';
import PasswordChange from './Pages/PasswordChange';
import SecurityZonePage from './Pages/SecurityZonePage';
import FollowUpPage from './Pages/FollowUpPage';
import UserModel from './Model/UserModel';
import MonitoringModel from './Model/MonitoringModel';

const App = () => {
  const [userVictim, setUserVictim] = useState(new UserModel());
  const [userAttacker, setUserAttacker] = useState(new UserModel());
  const [monitoringData, setMonitoringData] = useState(new MonitoringModel());

  return (
    <GeneralContext.Provider value={{ userVictim, setUserVictim, userAttacker, setUserAttacker, monitoringData, setMonitoringData }}>
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
            <Route path="/recover-password" element={<PasswordRecovery/>} />
            <Route path="/change-password" element={<PasswordChange/>} />
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