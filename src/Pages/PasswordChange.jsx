import React from 'react';
import PasswordChangeController from '../Controller/PasswordChangeController';
import '../Pages/css/login.css';

const PasswordChange = () => {
  return (
    <div className="login-page">
        <div className="toolbar">
            <h1 className="title">Password Change</h1>
        </div>
            <PasswordChangeController />
    </div>
  );
};

export default PasswordChange;