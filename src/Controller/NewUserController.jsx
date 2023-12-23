// NewUserController.jsx
import React, { useState } from "react";
import NewUserModel from "../Model/NewUserModel";
import NewUserView from "../View/NewUserView";
import { BaseURL } from "./BaseURL";

const UserTypeDto = {
  VICTIMA: { id: 2, name: "Victima" },
  AGRESOR: { id: 3, name: "Agresor" },
};

function NewUserController({ role }) {
  const [user, setUser] = useState(new NewUserModel());

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userTypeDto =
      role === "Victima" ? UserTypeDto.VICTIMA : UserTypeDto.AGRESOR;

    const datosPersona = {
      nombre: user.firstName,
      seg_nombre: user.secondName,
      apellido: user.lastName,
      seg_apellido: user.secondLastName,
      cedula: user.cedula,
      fch_nac: user.birthDate,
      direccion: user.address, // Asegúrate de que este campo exista en tu modelo de usuario
    };

    const response = await fetch(`${BaseURL.apiUrl}/users/setUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        imei: user.imei,
        password: user.password,
        userTypeDto,
        email: user.email,
        datosPersona,
      }),
    });

    if (!response.ok) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      return;
    }

  console.log("La petición fue exitosa");
  };

  return (
    <NewUserView
      user={{ role: role }}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default NewUserController;
