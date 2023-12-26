import React from "react";
import { useNavigate } from "react-router-dom";
import useLoginModel from "../Model/LoginModel";
import LoginView from "../View/LoginView";
import { BaseURL } from "./BaseURL"; // Asegúrate de que la ruta sea correcta

const LoginController = () => {
  const { loginData, setLoginData } = useLoginModel();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos de inicio de sesión:", loginData);

    try {
      const response = await fetch(
        `${BaseURL.apiUrl}/users/authUser/${loginData.username}/${loginData.password}/1`,
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
      }else
        navigate("/home");
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
