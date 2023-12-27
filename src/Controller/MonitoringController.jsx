// MonitoringFormController.jsx
import React, { useState, useContext } from "react";
import MonitoringModel from "../Model/MonitoringModel";
import MonitoringView from "../View/MonitoringView";
import { BaseURL } from "./BaseURL";
import GeneralContext from '../GeneralContext';

const MonitoringFormController = () => {
  const [monitoring, setMonitoring] = useState(new MonitoringModel());
  const { setMonitoringData } = useContext(GeneralContext);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseSuccess, setResponseSuccess] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMonitoring({ ...monitoring, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BaseURL.apiUrl}/monitoring/setMonitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: monitoring.startDate,
        frequency: monitoring.frequency,
        downtime: monitoring.downtime,
        offlineTime: monitoring.offlineTime,
        minDistance: monitoring.minDistance,
        record: monitoring.record,
        endDate: monitoring.endDate,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      setResponseMessage(data.mensaje);
      setResponseSuccess(false);
      return;
    }
    console.log("La petición fue exitosa");
    setResponseMessage(data.mensaje);
    setResponseSuccess(data.respuesta);
  
    // Actualiza el estado monitoringData con los datos del monitoreo
    setMonitoringData(monitoring);
  
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