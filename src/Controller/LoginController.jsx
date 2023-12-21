import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginModel from '../Model/LoginModel';
import LoginView from '../View/LoginView';
import { BaseURL } from './BaseURL'; // Asegúrate de que la ruta sea correcta

const LoginController = () => {
  const { loginData, setLoginData } = useLoginModel();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión, por ejemplo, enviar datos al servidor
    console.log('Datos de inicio de sesión:', loginData);

    // Hacer una petición GET con fetch
    try {
      const response = await fetch(`${BaseURL.apiUrl}/users/authUser/${loginData.username}/${loginData.password}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else 
        navigate('/home');

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  };

  return <LoginView formData={loginData} onInputChange={handleInputChange} onSubmit={handleSubmit} />;
};

export default LoginController;