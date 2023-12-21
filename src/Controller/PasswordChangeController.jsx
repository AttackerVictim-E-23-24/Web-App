// PasswordChangeController.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PasswordChangeView from "../View/PasswordChangeView";
import { BaseURL } from "./BaseURL";

function PasswordChangeController() {
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

    const response = await fetch(`${BaseURL.apiUrl}/recovery/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recoveryKey,
        newPass,
      }),
    });

    if (!response.ok) {
      // Manejar error
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      return;
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);
    navigate('/login');
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