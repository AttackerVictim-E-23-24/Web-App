// MonitoringFormController.jsx
import React, { useState, useContext, useEffect } from "react";
import MonitoringModel from "../Model/MonitoringModel";
import MonitoringView from "../View/MonitoringView";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

const MonitoringFormController = () => {
  const [monitoring, setMonitoring] = useState(new MonitoringModel());
  const { setMonitoringData, userVictim, userAttacker, monitoringData } =
    useContext(GeneralContext); // Añade userVictim y userAttacker
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);
  // Add isEditing state
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMonitoring({ ...monitoring, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const url = isEditing
      ? `${BaseURL.apiUrl}/monitoreo/putMonitoreo/${userVictim.userName}`
      : `${BaseURL.apiUrl}/monitoreo/setMonitoreo`;

    const method = isEditing ? "put" : "post";

    const data = isEditing
      ? {
          frecuencia: monitoring.frequency,
          tiempoInactividad: monitoring.downtime,
          tiempoOffline: monitoring.offlineTime,
          distanciaAlejamiento: monitoring.minDistance,
        }
      : {
          frecuencia: monitoring.frequency,
          tiempoInactividad: monitoring.downtime,
          tiempoOffline: monitoring.offlineTime,
          distanciaAlejamiento: monitoring.minDistance,
          cedulaAtacante: userAttacker.cedula,
          cedulaVictima: userVictim.cedula,
        };

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      setResponseMessage("Error en la petición");
      setResponseSuccess(false);
      return;
    }

    console.log("La petición fue exitosa");
    setResponseMessage("La petición fue exitosa");
    setResponseSuccess(true);
    const responseData = await response.json();

    // Inicia el monitoreo con los datos de la respuesta
    setMonitoring({
      frequency: responseData.respuesta.frecuencia,
      downtime: responseData.respuesta.tiempoInactividad,
      offlineTime: responseData.respuesta.tiempoOffline,
      minDistance: responseData.respuesta.distanciaAlejamiento,
    });

    // Actualiza el estado monitoringData con los datos del monitoreo
    setMonitoringData((prevMonitoringData) => ({
      ...prevMonitoringData,
      id: responseData.respuesta.id,
      frequency: responseData.respuesta.frecuencia,
      downtime: responseData.respuesta.tiempoInactividad,
      offlineTime: responseData.respuesta.tiempoOffline,
      minDistance: responseData.respuesta.distanciaAlejamiento,
    }));

    // Borra los inputs
    setMonitoring(new MonitoringModel());
  };

  useEffect(() => {
    if (monitoringData) {
      setMonitoring(monitoringData);
      setIsEditing(true); // Set isEditing to true if monitoringData exists
    } else {
      setIsEditing(false); // Set isEditing to false if monitoringData does not exist
    }
  }, [monitoringData]);

  const handleDelete = async () => {
    const url = `${BaseURL.apiUrl}/monitoreo/deleteMonitoreo/${userAttacker.userName}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.respuesta) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      setResponseMessage("Error en la petición");
      setResponseSuccess(false);
      return;
    }

    console.log("La petición fue exitosa");
    setResponseMessage(responseData.mensaje);
    setResponseSuccess(true);

    // Actualiza el estado monitoringData con los datos del monitoreo
    setMonitoringData((prevMonitoringData) => ({
      ...prevMonitoringData,
      id: null,
    }));

    // Borra los inputs
    setMonitoring(new MonitoringModel());
  };
  return (
    <MonitoringView
      monitoring={monitoring}
      handleInputChange={handleInputChange}
      handleSubmit={submitForm}
      handleDelete={handleDelete}
      responseMessage={responseMessage}
      responseSuccess={responseSuccess}
    />
  );
};

export default MonitoringFormController;
