// MonitoringView.jsx
import React from "react";
import "../Pages/css/MonitoringView.css";

function MonitoringView({ handleInputChange, handleSubmit, responseMessage, responseSuccess }) {
  return (
    <div>
    <form id="formId" method="POST" onSubmit={handleSubmit}>
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
              <label htmlFor="frequency">Frecuencia (segundos)</label>
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
              <label htmlFor="downtime">Tiempo de inactividad (segundos)</label>
              <input
                id="downtime"
                name="downtime"
                type="number"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="offlineTime">Tiempo offline (segundos)</label>
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
                Distancia mínima de alejamiento (Km)
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
              <label htmlFor="endDate">Fecha fin del monitoreo (opcional)</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
          </div>
        </div>
        <button type="submit">Enviar</button>
        <div style={{ borderRadius: '10px', backgroundColor: responseSuccess ? '#6dd772' : '#ff5c4b' }}>
        {responseMessage}
      </div>
      </form>
    </div>
  );
}

export default MonitoringView;
