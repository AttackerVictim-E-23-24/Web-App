// MonitoringPage.jsx
import React from "react";
import "../Pages/css/monitoring.css";
import MapController from "../Controller/MapController";
import MonitoringController from "../Controller/MonitoringController";

const MonitoringPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí va la lógica para manejar el envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="view-container">
          <h1>Registrar Monitoreo</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <MonitoringController handleSubmit={handleSubmit} />

            <div className="page">
              <MapController canDrawPolygons={false} />
            </div>
            <button type="submit" form="formId">
              Registrar Monitoreo
            </button>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
};

export default MonitoringPage;
