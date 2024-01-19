// PasswordChangeView.jsx
import React from 'react';
import '../Pages/css/passwordChangeView.css';

function PasswordChangeView({ recoveryKey, newPass, handleInputChange, handleSubmit }) {
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <label>
          Clave de recuperación:
          <input className='field codigo' type="text" name="recoveryKey" value={recoveryKey} onChange={handleInputChange} required  />
        </label>
        <label>
          Nueva contraseña:
          <input className='field' type="password" name="newPass" value={newPass} onChange={handleInputChange} required  />
        </label>
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
}

export default PasswordChangeView;