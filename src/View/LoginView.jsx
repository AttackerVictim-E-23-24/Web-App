// LoginForm.js
import React from 'react';
import '../Pages/css/styles.css'

const LoginView = ({ formData, onInputChange, onSubmit }) => {
  const { username, password } = formData;

  return (
    <div className="card">
      <h2 className="card-title">Iniciar sesión</h2>
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
    </div>
  );
};

export default LoginView;
