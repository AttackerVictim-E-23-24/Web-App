import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginController from '../Controller/LoginController'; // Asegúrate de que la ruta sea correcta
import '../Pages/css/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="login-page">
        <div className="toolbar">
            <h1 className="title">Admin App</h1>
        </div>
      <LoginController />
    </div>
  );
};

export default LoginPage;