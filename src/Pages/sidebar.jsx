// Sidebar.jsx
import React, { useContext } from "react";
import "../Pages/css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from '../GeneralContext';

const Sidebar = () => {
  const location = useLocation();
  const { userVictim, userAttacker } = useContext(GeneralContext);

  const isActive = (path) => {
    return location.pathname.includes(path);
  };


  return (
    <div className="sidebar">
      <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
        <h2 className="title">AttackerVictim</h2>
      </Link>
      <hr className="css-6vm7vh" />

      <ul>
        <Link to="/home" className="sidebar-link">
          <li className={isActive("/home") ? "active css-1x3v3vy" : ""}>
            Consultar usuario
          </li>
        </Link>
        <Link to="/follow-up" className="sidebar-link">
          <li className={isActive("/follow-up") ? "active css-1x3v3vy" : ""}>
            Seguimiento
          </li>
        </Link>
        <Link to="/monitoring" className="sidebar-link">
          <li className={isActive("/monitoring") ? "active css-1x3v3vy" : ""}>
            Monitoreo
          </li>
        </Link>
        <Link to="/security-zone" className="sidebar-link">
          <li
            className={isActive("/security-zone") ? "active css-1x3v3vy" : ""}
          >
            Zonas de seguridad
          </li>
        </Link>
        <Link to="/alerts" className="sidebar-link">
          <li className={isActive("/alerts") ? "active css-1x3v3vy" : ""}>
            Alertas
          </li>
        </Link>
      </ul>

      <div className="user-info">
        <p>Victima: {userVictim?.firstName}</p>
        <p>Agresor: {userAttacker?.firstName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
