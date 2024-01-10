// UsersTableController.jsx
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsersTableView from "../View/UsersTableView";
import UsersTableModel from "../Model/UsersTableModel";
import UserModel from "../Model/UserModel.jsx";
import MonitoringModel from "../Model/MonitoringModel.jsx";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

function UsersTableController() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(new UsersTableModel());
  const [searchName, setSearchName] = useState("");
  const [searchCedula, setSearchCedula] = useState("");
  const [filtersActive, setFiltersActive] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { setMonitoringData, setUserAttacker, setUserVictim } =
    useContext(GeneralContext);

  const handleNameSearchChange = (event) => {
    setSearchName(event.target.value);
    setFiltersActive(event.target.value !== "" || searchCedula !== "");
  };

  const handleCedulaSearchChange = (event) => {
    setSearchCedula(event.target.value);
    setFiltersActive(event.target.value !== "" || searchName !== "");
  };

  const filterUsers = useCallback(() => {
    if (filtersActive) {
      return users.getUsers().filter((user) => {
        if (user.datosPersona && user.datosPersona.cedula != null) {
          // Caso 1: Ambos campos están llenos
          if (searchCedula && searchName) {
            return (
              user.datosPersona.cedula.toString().includes(searchCedula) &&
              user.datosPersona.name
                .toLowerCase()
                .includes(searchName.toLowerCase())
            );
          }
          // Caso 2: Solo el campo de cédula está lleno
          else if (searchCedula) {
            return user.datosPersona.cedula.toString().includes(searchCedula);
          }
          // Caso 3: Solo el campo de nombre está lleno
          else if (searchName) {
            return user.datosPersona.name
              .toLowerCase()
              .includes(searchName.toLowerCase());
          }
        }
        return false;
      });
    } else {
      return users.getUsers();
    }
  }, [searchCedula, searchName, filtersActive, users]);

  const handleResetSearch = () => {
    setSearchName("");
    setSearchCedula("");
    setFiltersActive(false);
  };

  const handleInputChange = (event, userId) => {
    const { name, value } = event.target;
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.getUsers().map((user) => {
        if (user.getId() === userId) {
          return { ...user, [name]: value };
        }
        return user;
      });
      return new UsersTableModel(updatedUsers);
    });
  };

  const handleSubmit = async (event, username) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${BaseURL.apiUrl}/monitoreo/getMonitoreo/${username}`
      );
      const data = await response.json();

      console.log("API response", data);

      const monitoringModel = new MonitoringModel(
        data.id,
        null, // startDate no está en la respuesta
        data.frecuencia,
        data.tiempoInactividad,
        data.tiempoOffline,
        data.distanciaAlejamiento,
        null, // record no está en la respuesta
        null  // endDate no está en la respuesta
      );
      
      const attackerModel = new UserModel(
        data.atacanteUser.datosPersona.nombre,
        data.atacanteUser.datosPersona.seg_nombre,
        data.atacanteUser.datosPersona.apellido,
        data.atacanteUser.datosPersona.seg_apellido,
        data.atacanteUser.datosPersona.fch_nac,
        data.atacanteUser.datosPersona.cedula,
        data.atacanteUser.userName,
        data.atacanteUser.password,
        data.atacanteUser.email,
        data.atacanteUser.userTypeDto.name, // role no está en la respuesta, se usa userTypeDto.name
        data.atacanteUser.imei,
        data.atacanteUser.userTypeDto, // userTypeDto está en la respuesta
        data.atacanteUser.datosPersona.direccion,
        null // registrationDate no está en la respuesta
      );
      
      const victimModel = new UserModel(
        data.victimaUser.datosPersona.nombre,
        data.victimaUser.datosPersona.seg_nombre,
        data.victimaUser.datosPersona.apellido,
        data.victimaUser.datosPersona.seg_apellido,
        data.victimaUser.datosPersona.fch_nac,
        data.victimaUser.datosPersona.cedula,
        data.victimaUser.userName,
        data.victimaUser.password,
        data.victimaUser.email,
        data.victimaUser.userTypeDto.name, // role no está en la respuesta, se usa userTypeDto.name
        data.victimaUser.imei,
        data.victimaUser.userTypeDto, // userTypeDto está en la respuesta
        data.victimaUser.datosPersona.direccion,
        null // registrationDate no está en la respuesta
      );

      setMonitoringData(monitoringModel);
      setUserAttacker(attackerModel);
      setUserVictim(victimModel);

      // Redirige al usuario a /follow-up
      navigate("/follow-up");
      // Código para enviar data a seguimiento
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUsers = async () => {
    const response = await fetch(`${BaseURL.apiUrl}/users/getAll`);
    const data = await response.json();
    const roleMap = {
      1: "Admin",
      2: "Victima",
      3: "Agresor",
      // Agrega más roles aquí si es necesario
    };
    if (Array.isArray(data.respuesta)) {
      const users = data.respuesta.map(
        (user) =>
          new UserModel(
            user.datosPersona.nombre,
            user.datosPersona.seg_nombre,
            user.datosPersona.apellido,
            user.datosPersona.seg_apellido,
            user.datosPersona.fch_nac,
            user.datosPersona.cedula,
            user.userName,
            user.password,
            user.email,
            roleMap[user.userTypeDto.id],
            user.imei,
            user.userTypeDto.name,
            user.datosPersona.direccion,
            null // registrationDate no está en los datos proporcionados
          )
      );
      setUsers(new UsersTableModel(users));
    } else {
      console.error("API response is not an array:", data);
      setUsers(new UsersTableModel([]));
    }
  };
  /*
  const fetchUsers = async () => {
    // Simulación de la respuesta del servidor
    const data = {
      respuesta: [
        {
          id: 2,
          userName: "ignacitoac",
          imei: "123456789012345",
          password: null,
          email: "ignacioalvarezac@gmail.com",
          datosPersona: {
            nombre: "Ignacio",
            seg_nombre: "Andres",
            apellido: "Alvarez",
            seg_apellido: "Cuesta",
            cedula: 28443153,
            fch_nac: "1990-01-01",
            direccion: "Calle 123, Sector 4",
          },
          userTypeDto: {
            id: 2,
            name: "Victima",
          },
        },
        {
          id: 3,
          userName: "kattiecuesata",
          imei: "123456789012345",
          password: null,
          email: "kattiecuesta@gmail.com",
          datosPersona: {
            nombre: "Kattie",
            seg_nombre: "Isabel",
            apellido: "Cuesta",
            seg_apellido: "Buelvas",
            cedula: 11924442,
            fch_nac: "1990-01-01",
            direccion: "Calle 123, Sector 4",
          },
          userTypeDto: {
            id: 3,
            name: "Agresor",
          },
        },
      ],
      mensaje: "Datos solicitados exitosamente",
      status: "OK",
    };
    if (Array.isArray(data.respuesta)) {
      const users = data.respuesta.map(
        (user) =>
          new UserModel(
            user.datosPersona.nombre,
            user.datosPersona.seg_nombre,
            user.datosPersona.apellido,
            user.datosPersona.seg_apellido,
            user.datosPersona.fch_nac,
            user.datosPersona.cedula,
            user.userName,
            user.password,
            user.email,
            null, // role no está en los datos proporcionados
            user.imei,
            user.userTypeDto.name,
            user.datosPersona.direccion,
            null // registrationDate no está en los datos proporcionados
          )
      );
      setUsers(new UsersTableModel(users));
    } else {
      console.error("API response is not an array:", data);
      setUsers(new UsersTableModel([]));
    }
  };

  */
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(filterUsers());
  }, [filterUsers]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <span>Nombre:</span>
          <input
            type="text"
            value={searchName}
            onChange={handleNameSearchChange}
            placeholder="Buscar por nombre"
            style={{ padding: "5px", borderRadius: "5px" }}
          />
          <span>Cedula:</span>
          <input
            type="number"
            value={searchCedula}
            onChange={handleCedulaSearchChange}
            placeholder="Buscar por cédula"
            style={{ padding: "5px", borderRadius: "5px" }}
          />
        </div>
        <button
          onClick={handleResetSearch}
          style={{ marginRight: "10px", borderRadius: "5px", width: "100px" }}
        >
          Ver todos
        </button>
      </div>
      <hr />

      <UsersTableView
        users={filteredUsers}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default UsersTableController;
