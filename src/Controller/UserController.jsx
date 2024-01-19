// UserController.jsx
import React, { useState, useContext, useEffect } from "react";
import UserModel from "../Model/UserModel";
import UserView from "../View/UserView";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

const UserTypeDto = {
  VICTIMA: { id: 2, name: "victima" },
  AGRESOR: { id: 3, name: "agresor" },
};

function UserController({ role }) {
  const [user, setUser] = useState(new UserModel());
  const { setUserVictim, setUserAttacker, userVictim, userAttacker } =
    useContext(GeneralContext);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "birthDate") {
      updatedValue = new Date(value);
    }

    setUser({ ...user, [name]: updatedValue });
  };

  useEffect(() => {
    if (role === "victima" && userVictim) {
      setUser(userVictim);
      console.log(userVictim);
    } else if (role === "agresor" && userAttacker) {
      setUser(userAttacker);
      console.log(userAttacker);
    }
  }, [role, userVictim, userAttacker]);

  const handlePostRequest = async (requestBody) => {
    const url = `${BaseURL.apiUrl}/users/setUser`;

    const response = await fetch(url, {
      method: "POST",
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
    setResponseSuccess(data.status);

    if (data.status) {
      console.log(data.mensaje);
      if (role === "victima")
        setUserVictim({
          id: user.id,
          userName: user.userName,
          imei: user.imei,
          password: user.password,
          email: user.email,
          firstName: user.firstName,
          secondName: user.secondName,
          lastName: user.lastName,
          secondLastName: user.secondLastName,
          cedula: user.cedula,
          birthDate: user.birthDate,
          direccion: user.direccion,
          userTypeDto: user.userTypeDto,
        });
      else if (role === "agresor")
        setUserAttacker({
          id: user.id,
          userName: user.userName,
          imei: user.imei,
          password: user.password,
          email: user.email,
          firstName: user.firstName,
          secondName: user.secondName,
          lastName: user.lastName,
          secondLastName: user.secondLastName,
          cedula: user.cedula,
          birthDate: user.birthDate,
          direccion: user.direccion,
          userTypeDto: user.userTypeDto,
        });
    }
  };

  const handlePutRequest = async (datosPersona, userName) => {
    const url = `${BaseURL.apiUrl}/users/putUser/${userName}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPersona),
    });

    if (!response.ok) {
      const errorMessage = `Error en la petición: ${response.status}, ${response.statusText}`;
      console.error(errorMessage);
      return;
    }

    const data = await response.json();

    setResponseMessage(data.mensaje);
    setResponseSuccess(data.status);

    if (data.status) {
      console.log(data.mensaje);
      if (role === "victima")
        setUserVictim({
          id: data.respuesta._id,
          userName: user.userName, // Agrega esta línea
          firstName: data.respuesta.nombre,
          secondName: data.respuesta.seg_nombre,
          lastName: data.respuesta.apellido,
          secondLastName: data.respuesta.seg_apellido,
          cedula: data.respuesta.cedula,
          birthDate: data.respuesta.fch_nac,
          direccion: data.respuesta.direccion,
        });
      else if (role === "agresor")
        setUserAttacker({
          id: data.respuesta._id,
          userName: user.userName, // Agrega esta línea
          firstName: data.respuesta.nombre,
          secondName: data.respuesta.seg_nombre,
          lastName: data.respuesta.apellido,
          secondLastName: data.respuesta.seg_apellido,
          cedula: data.respuesta.cedula,
          birthDate: data.respuesta.fch_nac,
          direccion: data.respuesta.direccion,
        });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userTypeDto =
      role === "victima" ? UserTypeDto.VICTIMA : UserTypeDto.AGRESOR;
    const formattedBirthDate = user.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "";

    const datosPersona = {
      nombre: user.firstName,
      seg_nombre: user.secondName,
      apellido: user.lastName,
      seg_apellido: user.secondLastName,
      cedula: user.cedula,
      fch_nac: formattedBirthDate,
      direccion: user.direccion,
    };

    const requestBody = {
      userName: user.userName,
      imei: "token",
      password: user.password,
      userTypeDto,
      email: user.email,
      datosPersona,
    };
    console.log("requestBody", requestBody);

    if (user.id) {
      handlePutRequest(datosPersona, user.userName);
    } else {
      handlePostRequest(requestBody);
    }
  };

  return (
    <UserView
      user={{ ...user, role: role }}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormSubmit}
      responseMessage={responseMessage}
      responseSuccess={responseSuccess}
    />
  );
}

export default UserController;
