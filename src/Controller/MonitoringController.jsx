// MonitoringFormController.jsx
import React, { useState } from "react";
import MonitoringModel from "../Model/MonitoringModel";
import MonitoringView from "../View/MonitoringView";
import { BaseURL } from "./BaseURL";

const MonitoringFormController = ({ handleSubmit }) => {
  const [monitoring, setMonitoring] = useState(new MonitoringModel());

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

    if (!response.ok) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );
      return;
    }

    console.log("La petición fue exitosa");
    handleSubmit();
  };

  return (
    <MonitoringView
      handleInputChange={handleInputChange}
      handleSubmit={submitForm}
    />
  );
};

export default MonitoringFormController;
