// PasswordChangeController.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PasswordChangeView from "../View/PasswordChangeView";
import { BaseURL } from "./BaseURL";

function PasswordChangeController({email}) {
  const [recoveryKey, setRecoveryKey] = useState('');
  const [newPass, setNewPass] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'recoveryKey') {
      setRecoveryKey(value);
    } else if (name === 'newPass') {
      setNewPass(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BaseURL.apiUrl}/users/recPassword/${email}/${recoveryKey}/${newPass}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else 
        navigate('/login');


      const data = await response.json();
      console.log("Datos recibidos:", data);

    } catch (error) {
      // Manejar error
      console.error("Error en la petición:", error);
    }
  };

  return (
    <PasswordChangeView
      recoveryKey={recoveryKey}
      newPass={newPass}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default PasswordChangeController;