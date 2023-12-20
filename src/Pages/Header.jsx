// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Pages/css/header.css'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  return (
    <header className="header">
      <div className="toolbar">
        <h1 className="title">Admin App</h1>
        <nav>
          <ul className="nav-list">
            <li><Link to="/monitoring">Monitoreo</Link></li>
            <li><Link to="/security-zones">Zonas de Seguridad</Link></li>
            <li><Link to="/alerts">Alertas</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;