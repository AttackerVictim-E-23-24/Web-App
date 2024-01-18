// LoginController.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModel from "../Model/LoginModel";
import LoginView from "../View/LoginView";
import { BaseURL } from "./BaseURL"; // Asegúrate de que la ruta sea correcta
import GeneralContext from "../GeneralContext";

const LoginController = () => {
  const [loginData, setLoginData] = useState(new LoginModel());
  const navigate = useNavigate();
  const { setUserVictim, setUserAttacker, setMonitoringData, setLoginData: setContextLoginData } =
  useContext(GeneralContext);

  const handleInputChange = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", loginData);

    try {
      const response = await fetch(
        `${BaseURL.apiUrl}/users/authUser/${loginData.username}/${loginData.password}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.respuesta !== true) {
        // Aquí puedes establecer el valor de loginData.message
        setLoginData((prevData) => ({ ...prevData, message: data.mensaje }));
        throw new Error(
          `HTTP error! status: ${response.status}. Message: ${data.mensaje}`
        );
      } else {
        // Establecer los datos del contexto en null antes de navegar a la página de inicio
        setUserVictim(null);
        setUserAttacker(null);
        setMonitoringData(null);
        setContextLoginData(loginData); // Guarda loginData en el contexto
        navigate("/home");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginView
      formData={loginData}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginController;