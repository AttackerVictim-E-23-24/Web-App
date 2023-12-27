// OldUserController.jsx
import React, { useState } from "react";
import OldUserModel from "../Model/OldUserModel";
import OldUserView from "../View/OldUserView";
import { BaseURL } from "./BaseURL";
import UsersModel from "../Model/UsersModel";

const UserTypeDto = {
  VICTIMA: { id: 2, name: "Victima" },
  AGRESOR: { id: 3, name: "Agresor" },
};

function OldUserController({ role, handleSubmit }) {
  const [user, setUser] = useState(new OldUserModel());
  const users = new UsersModel();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const userTypeDto =
      role === "Victima" ? UserTypeDto.VICTIMA : UserTypeDto.AGRESOR;

    const datosPersona = {
      nombre: user.firstName || "",
      seg_nombre: user.secondName || "",
      apellido: user.lastName || "",
      seg_apellido: user.secondLastName || "",
      cedula: user.cedula || "",
      fch_nac: user.birthDate || "",
      direccion: user.address || "",
    };

    const response = await fetch(`${BaseURL.apiUrl}/users/setUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName || "",
        imei: user.imei || "",
        password: user.password || "",
        userTypeDto,
        email: user.email || "",
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

    users.addUser(user);

    console.log("La petición fue exitosa");

    // Llama a la función handleSubmit que se pasa como prop
    handleSubmit(event);
  };

  return (
    <OldUserView
      user={{ role: role }}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormSubmit}
    />
  );
}

export default OldUserController;
