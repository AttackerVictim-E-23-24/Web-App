// NewUserController.jsx
import React, { useState, useContext } from "react";
import UserModel from "../Model/UserModel";
import UserView from "../View/UserView";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

const UserTypeDto = {
  VICTIMA: { id: 2, name: "Victima" },
  AGRESOR: { id: 3, name: "Agresor" },
};

function UserController({ role, setAttackerPrintable, setVictimPrintable }) {
  const [user, setUser] = useState(new UserModel());
  const { setUserVictim, setUserAttacker } = useContext(GeneralContext);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
  
    if (name === 'birthDate') {
      updatedValue = new Date(value);
    }
  
    setUser({ ...user, [name]: updatedValue });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userTypeDto =
      role === "victima" ? UserTypeDto.VICTIMA : UserTypeDto.AGRESOR;
    const formattedBirthDate = user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '';
  
    const datosPersona = {
      nombre: user.firstName,
      seg_nombre: user.secondName,
      apellido: user.lastName,
      seg_apellido: user.secondLastName,
      cedula: user.cedula,
      fch_nac: formattedBirthDate,
      direccion: user.address,
    };
    console.log(datosPersona);
  
    const requestBody = {
      userName: user.userName,
      imei: user.imei,
      password: user.password,
      userTypeDto,
      email: user.email,
      datosPersona,
    };
  
    const response = await fetch(`${BaseURL.apiUrl}/users/setUser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = `Error en la petición: ${response.status}, ${response.statusText}`;
      console.error(errorMessage);
      return;
    }

    const data = await response.json();

    setResponseMessage(data.mensaje);
    setResponseSuccess(data.respuesta);

    if (data.respuesta) {
      console.log(data.mensaje);
      // Inicializa el usuario correspondiente
      if (role === "victima") {
        setUserVictim(user);
        setVictimPrintable(false);
      } else if (role === "agresor") {
        setUserAttacker(user);
        setAttackerPrintable(false);
      }
    }


    console.log("La petición fue exitosa");
  };

  return (
    <UserView
      user={{ role: role }}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormSubmit}
      responseMessage={responseMessage}
      responseSuccess={responseSuccess}
    />
  );
}

export default UserController;
