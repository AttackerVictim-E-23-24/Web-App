// PasswordRecoveryController.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordRecoveryView from "../View/PasswordRecoveryView";
import PasswordRecoveryModel from "../Model/PasswordRecoveryModel";
import { BaseURL } from "./BaseURL";

function PasswordRecoveryController() {
  const [passwordRecovery, setPasswordRecovery] = useState(
    new PasswordRecoveryModel("")
  );
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPasswordRecovery(new PasswordRecoveryModel(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        let emailWithoutAt = passwordRecovery.email;
        emailWithoutAt= emailWithoutAt.replace("@gmail.com", "");
        const response = await fetch(
          `${BaseURL.apiUrl}/users/recPassword/${emailWithoutAt}`,
          {
            method: "GET",
          }
        );
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }else 
        navigate("/change-password", { state: { email: passwordRecovery.email } });
      
        const data = await response.json();
        console.log("Datos recibidos:", data);
    } catch (error) {
      // Manejar error
      console.error("Error en la petición:", error);
    }
  };

  return (
    <PasswordRecoveryView
      email={passwordRecovery.email}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default PasswordRecoveryController;
