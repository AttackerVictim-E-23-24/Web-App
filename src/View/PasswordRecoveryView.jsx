// PasswordRecoveryView.jsx
import React from 'react';
import '../Pages/css/passwordRecoveryView.css';

function PasswordRecoveryView({ email, handleInputChange, handleSubmit }) {
  return (
    <div className="recovery-card">
      <form onSubmit={handleSubmit}>
        <label >
            <p>Correo electrónico:</p>
          <input className='field' type="email" value={email} onChange={handleInputChange} required />
        </label>
        <div className='recovery-message'>
            <p>Se enviará un correo electrónico con un enlace para recuperar la contraseña.</p>
        </div>
        <button type="submit" className='recovery-button'>Recuperar contraseña</button>
      </form>
    </div>
  );
}

export default PasswordRecoveryView;