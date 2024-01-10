// MonitoringFormController.jsx
import React, { useState, useContext } from "react";
import MonitoringModel from "../Model/MonitoringModel";
import MonitoringView from "../View/MonitoringView";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

const MonitoringFormController = () => {
  const [monitoring, setMonitoring] = useState(new MonitoringModel());
  const { setMonitoringData, userVictim, userAttacker } =
    useContext(GeneralContext); // Añade userVictim y userAttacker
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMonitoring({ ...monitoring, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BaseURL.apiUrl}/monitoreo/setMonitoreo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frecuencia: monitoring.frequency,
        tiempoInactividad: monitoring.downtime,
        tiempoOffline: monitoring.offlineTime,
        distanciaAlejamiento: monitoring.minDistance,
        cedulaAtacante: userAttacker.cedula, // Usa userAttacker.cedula
        cedulaVictima: userVictim.cedula, // Usa userVictim.cedula
      }),
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
    const newMonitoring = { ...monitoring, id: responseData.respuesta.id };
    setMonitoring(newMonitoring);
    // Actualiza el estado monitoringData con los datos del monitoreo
    // Actualiza el estado monitoringData con los datos del monitoreo
    setMonitoringData((prevMonitoringData) => ({
      ...prevMonitoringData,
      id: responseData.respuesta.id,
    }));

    // Borra los inputs
    setMonitoring(new MonitoringModel());
  };

  return (
    <MonitoringView
      handleInputChange={handleInputChange}
      handleSubmit={submitForm}
      responseMessage={responseMessage}
      responseSuccess={responseSuccess}
    />
  );
};

export default MonitoringFormController;
