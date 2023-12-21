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
        const emailWithoutAt = passwordRecovery.email.replace("@gmail.com", "");
        const response = await fetch(
          `${BaseURL.apiUrl}/recPassword/${emailWithoutAt}`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            mode: "no-cors",
          }
        );
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const data = await response.json();
        console.log("Datos recibidos:", data);
        navigate("/change-password");
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
