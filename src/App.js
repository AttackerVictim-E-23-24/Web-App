import React from "react";
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
import ExistingUserPage from './Pages/ExistingUserPage';

const App = () => {
  return (
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
            path="/existingUser"
            element={
              <div>
                <Sidebar />
                <ExistingUserPage />
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
          <Route path="/recover-password" element={<PasswordRecovery/>} />
          <Route path="/change-password" element={<PasswordChange/>} />
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Redirige de la ruta raíz a /login */}
          {/* Aquí puedes agregar más rutas si lo necesitas */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
