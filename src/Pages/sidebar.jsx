import React, { useState } from 'react';
import '../Pages/css/sidebar.css';
import { Link, useLocation  } from 'react-router-dom'; // Importa Link

const Sidebar = () => { // No necesitas onOptionChange si estás usando Link
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual

  let hoverColor;
  if (location.pathname.includes('admin')) {
    hoverColor = 'yellow';
  } else if (location.pathname.includes('attacker')) {
    hoverColor = 'red';
  } else {
    hoverColor = '#0074cc'; // Color por defecto
  }
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sidebar">
      <h2>AttackerVictim</h2>
      <hr css-6vm7vh/>

      <ul>
        <div className='css-u2ablu ' >
        <li onClick={toggleDropdown}>
          <span>{isDropdownOpen ? '▲' : '▼'}</span>
          <span>    Usuarios</span>
          {isDropdownOpen && (
            <ul className="dropdown">
              <Link to="/admin" className="sidebar-link"><li style={{ '--hover-color': hoverColor }}>Administrador</li></Link> {/* Usa Link para navegar a /administrador */}
              <Link to="/victim" className="sidebar-link"><li>Victima</li></Link> {/* Usa Link para navegar a /victima */}
              <Link to="/attacker" className="sidebar-link"><li>Atacante</li></Link> {/* Usa Link para navegar a /atacante */}
            </ul>
          )}
        </li></div>
        <Link to="/monitoring" className="sidebar-link"><li style={{ '--hover-color': hoverColor }}>Monitoreo</li></Link> {/* Usa Link para navegar a /monitoreo */}
        <Link to="/security-zone" className="sidebar-link"><li>Zonas de seguridad</li></Link> {/* Usa Link para navegar a /zonas */}
      </ul>
    </div>
  );
};

export default Sidebar;