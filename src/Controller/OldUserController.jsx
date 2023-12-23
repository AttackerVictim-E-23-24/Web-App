// OldUserController.jsx
import React, { useState } from "react";
import OldUserModel from "../Model/OldUserModel";
import OldUserView from "../View/OldUserView";
import UsersTableView from "../View/UsersTableView"; // Asegúrate de importar UsersTableView
import { BaseURL } from "./BaseURL";
import UsersModel from "../Model/UsersModel";

const UserTypeDto = {
  VICTIMA: { id: 2, name: "Victima" },
  AGRESOR: { id: 3, name: "Agresor" },
};

function OldUserController({ role }) {
  const [user, setUser] = useState(new OldUserModel());
  const [showSearch, setShowSearch] = useState(true); // Nuevo estado para controlar la visualización del formulario de búsqueda
  const users = new UsersModel();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userTypeDto =
      role === "Victima" ? UserTypeDto.VICTIMA : UserTypeDto.AGRESOR;

    const datosPersona = {
      nombre: user.firstName || '',
      seg_nombre: user.secondName || '',
      apellido: user.lastName || '',
      seg_apellido: user.secondLastName || '',
      cedula: user.cedula || '',
      fch_nac: user.birthDate || '',
      direccion: user.address || '',
    };
    
    const response = await fetch(`${BaseURL.apiUrl}/users/setUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName || '',
        imei: user.imei || '',
        password: user.password || '',
        userTypeDto,
        email: user.email || '',
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
    setShowSearch(false); // Oculta el formulario de búsqueda después de agregar el usuario

    console.log("La petición fue exitosa");
  };

  return showSearch ? (
    <OldUserView
      user={{ role: role }}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  ) : (
    <UsersTableView users={users.getUsers()} /> // Muestra la tabla de usuarios cuando showSearch es false
  );
}

export default OldUserController;