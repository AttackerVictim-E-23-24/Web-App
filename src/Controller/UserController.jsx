// NewUserController.jsx
import React, { useState, useContext, useEffect } from "react";
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
  const { setUserVictim, setUserAttacker, userVictim, userAttacker } = useContext(GeneralContext);
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

  useEffect(() => {  
    if (role === "victima" && userVictim) {
      setUser(userVictim);
      console.log(userVictim);
    } else if (role === "agresor" && userAttacker) {
      setUser(userAttacker);
      console.log(userAttacker);
    }
  }, [role, userVictim, userAttacker, setVictimPrintable, setAttackerPrintable]);


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
  
    const url = user.id
      ? `${BaseURL.apiUrl}/users/putUser/${user.userName}`
      : `${BaseURL.apiUrl}/users/setUser`;
  
    const method = user.id ? "PUT" : "POST";
  
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.id ? datosPersona : requestBody),
    });
  
    console.log("send", user.id ? datosPersona : requestBody);  
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
      // Inicializa el usuario correspondiente
      if (role === "victima") {
        if (method === "PUT") {
          setUserVictim({
            id: data.respuesta._id,
            firstName: data.respuesta.nombre,
            secondName: data.respuesta.seg_nombre,
            lastName: data.respuesta.apellido,
            secondLastName: data.respuesta.seg_apellido,
            cedula: data.respuesta.cedula,
            birthDate: data.respuesta.fch_nac,
            direccion: data.respuesta.direccion,
          });
        } else if (method === "POST") {
          setUserVictim({
            id: data.id,
            userName: data.userName,
            imei: data.imei,
            password: data.password,
            email: data.email,
            firstName: data.datosPersona.nombre,
            secondName: data.datosPersona.seg_nombre,
            lastName: data.datosPersona.apellido,
            secondLastName: data.datosPersona.seg_apellido,
            cedula: data.datosPersona.cedula,
            birthDate: data.datosPersona.fch_nac,
            direccion: data.datosPersona.direccion,
            userTypeDto: data.userTypeDto,
          });
        }
        setVictimPrintable(false);
      } else if (role === "agresor") {
        if (method === "PUT") {
          setUserAttacker({
            id: data.respuesta._id,
            firstName: data.respuesta.nombre,
            secondName: data.respuesta.seg_nombre,
            lastName: data.respuesta.apellido,
            secondLastName: data.respuesta.seg_apellido,
            cedula: data.respuesta.cedula,
            birthDate: data.respuesta.fch_nac,
            direccion: data.respuesta.direccion,
          });
        } else if (method === "POST") {
          setUserAttacker({
            id: data.id,
            userName: data.userName,
            imei: data.imei,
            password: data.password,
            email: data.email,
            firstName: data.datosPersona.nombre,
            secondName: data.datosPersona.seg_nombre,
            lastName: data.datosPersona.apellido,
            secondLastName: data.datosPersona.seg_apellido,
            cedula: data.datosPersona.cedula,
            birthDate: data.datosPersona.fch_nac,
            direccion: data.datosPersona.direccion,
            userTypeDto: data.userTypeDto,
          });
        }
        setAttackerPrintable(false);
      }
    }
  
    console.log("La petición fue exitosa");
  };

  return (
    <UserView
      user={user}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormSubmit}
      responseMessage={responseMessage}
      responseSuccess={responseSuccess}
    />
  );
}

export default UserController;
