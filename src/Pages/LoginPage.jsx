import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginView from '../View/LoginView';
import '../Pages/css/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="login-page">
        <div className="toolbar">
            <h1 className="title">Admin App</h1>
        </div>
      <LoginView formData={formData} onInputChange={handleInputChange} />
    </div>
  );
};

export default LoginPage;