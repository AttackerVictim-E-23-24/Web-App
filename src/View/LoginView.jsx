// LoginView.js
import React from 'react';
import '../Pages/css/styles.css'
import { Link } from 'react-router-dom';

const LoginView = ({ formData, onInputChange, onSubmit }) => {
  const { username, password, message } = formData;

  return (
    <div className="card">
      <h2 className="card-title">Iniciar sesión</h2>
      {message && <div style={{ backgroundColor: "#e23f49", color: 'white', padding: '10px', borderRadius: '5px' }}>{message}</div>}
      <br />
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label>Nombre de usuario:</label>
          <input type="text" value={username} onChange={(e) => onInputChange('username', e.target.value)} />
        </div>
        <div className="input-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => onInputChange('password', e.target.value)} />
        </div>
        <div className="submit-button">
          <input type="submit" value="Iniciar sesión" />
        </div>
      </form>
      <Link to="/recover-password">¿Olvidaste tu contraseña?</Link>
    </div>
  );
};

export default LoginView;