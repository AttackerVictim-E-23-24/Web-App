// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import '../Pages/css/sidebar.css';
import { Link, useLocation  } from 'react-router-dom';

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(JSON.parse(localStorage.getItem('dropdownOpen')) || false);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('dropdownOpen', JSON.stringify(isDropdownOpen));
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="sidebar">
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 className="title">AttackerVictim</h2>
      </Link>
      <hr className='css-6vm7vh'/>

      <ul>
        <div className='css-u2ablu ' >
        <li onClick={toggleDropdown}>
          <span>{isDropdownOpen ? '▲' : '▼'}</span>
          <span className="userCSS">Usuarios</span>
          {isDropdownOpen && (
            <ul className="dropdown">
              <Link to="/home" className="sidebar-link"><li className={isActive('/home') ? 'active css-1x3v3vy' : ''}>Nuevo</li></Link>
              <Link to="/existingUser" className="sidebar-link"><li className={isActive('/existingUser') ? 'active css-1x3v3vy' : ''}>Existente</li></Link> 
            </ul>
          )}
        </li></div>
        <Link to="/monitoring" className="sidebar-link"><li className={isActive('/monitoring') ? 'active css-1x3v3vy' : ''}>Monitoreo</li></Link>
        <Link to="/security-zone" className="sidebar-link"><li className={isActive('/security-zone') ? 'active css-1x3v3vy' : ''}>Zonas de seguridad</li></Link>
      </ul>
    </div>
  );
};

export default Sidebar;