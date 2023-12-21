import React from 'react';
import PasswordRecoveryController from '../Controller/PasswordRecoveryController';
import '../Pages/css/login.css';

const PasswordRecovery = () => {
  return (
    <div className="login-page">
        <div className="toolbar">
            <h1 className="title">Password Recovery</h1>
        </div>
            <PasswordRecoveryController />
    </div>
  );
};

export default PasswordRecovery;