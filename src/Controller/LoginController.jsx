import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Importa useHistory
import useLoginModel from '../Model/LoginModel';
import LoginView from '../View/LoginView';
import { BaseURL } from './BaseURL'; // Asegúrate de que la ruta sea correcta

const LoginController = () => {
  const { loginData, setLoginData } = useLoginModel();

  const handleInputChange = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión, por ejemplo, enviar datos al servidor
    console.log('Datos de inicio de sesión:', loginData);

    // Hacer una petición GET con axios
    try {
      const response = await axios.get(BaseURL.apiUrl, {
        params: loginData,
        mode: 'cors'
      });
      console.log(response.data);

      // Si el estado es OK, redirige a la página de inicio
      if (response.status === 200) {
        history.push('/admin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <LoginView formData={loginData} onInputChange={handleInputChange} onSubmit={handleSubmit} />;
};

export default LoginController;