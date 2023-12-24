import React from 'react';
import { useLocation } from 'react-router-dom';
import PasswordChangeController from '../Controller/PasswordChangeController';
import '../Pages/css/login.css';

const PasswordChange = () => {
  const location = useLocation();
  const email = location.state.email;

  return (
    <div className="login-page">
        <div className="toolbar">
            <h1 className="title">Password Change</h1>
        </div>
        <PasswordChangeController email={email}/>
    </div>
  );
};

export default PasswordChange;