// MonitoringView.jsx
import React from "react";
import "../Pages/css/MonitoringView.css";

function MonitoringView({ handleInputChange, handleSubmit }) {
  return (
    <div>
      <form id="formId" method="POST" onSubmit={(event) => handleSubmit(event)}>
        <br />
        <br />

        <div>
          <div className="row">
            <div className="field">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="frequency">Frecuencia</label>
              <input
                id="frequency"
                name="frequency"
                type="number"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="downtime">Tiempo de inactividad</label>
              <input
                id="downtime"
                name="downtime"
                type="number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="offlineTime">Tiempo offline</label>
              <input
                id="offlineTime"
                name="offlineTime"
                type="number"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="minDistance">
                Distancia mínima de alejamiento
              </label>
              <input
                id="minDistance"
                name="minDistance"
                type="number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="record">Expediente</label>
              <input
                id="record"
                name="record"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="endDate">Fecha fin del monitoreo</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MonitoringView;
