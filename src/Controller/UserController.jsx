// UserController.jsx
import React, { useState } from "react";
import UserModel from "../Model/UserModel";
import UserView from "../View/UserView";
import { BaseURL } from "./BaseURL";

function UserController({ role}) {
  const [user, setUser] = useState(new UserModel());

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BaseURL.apiUrl}/users/setUser`, {
      method: "POST", // Siempre usa POST ya que UserView solo hace peticiones POST ahora
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        date: new Date(), // Agrega la fecha actual
        role: user.role, // Agrega el rol del usuario
      }), // Siempre envía el cuerpo de la solicitud
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
  };

  return (
    <UserView
      user={{role:role}}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default UserController;
