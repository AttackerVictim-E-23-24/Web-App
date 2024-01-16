// MonitoringView.jsx
import React from "react";
import "../Pages/css/MonitoringView.css";

function MonitoringView({
  monitoring,
  handleInputChange,
  handleSubmit,
  handleDelete,
  responseMessage,
  responseSuccess,
}) {
  return (
    <div>
      <form id="formId" method="POST" onSubmit={handleSubmit}>
        <br />
        <br />

        <div>
          <div className="row">
            <div className="field">
              <label htmlFor="minDistance">
                Distancia mínima de alejamiento (Km)
              </label>
              <input
                id="minDistance"
                name="minDistance"
                type="number"
                value={monitoring.minDistance || ""}
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
                value={monitoring.frequency || ""}
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
                value={monitoring.downtime || ""}
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
                value={monitoring.offlineTime || ""}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row"></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: monitoring.frequency ? "green" : undefined,
            }}
          >
            {monitoring.frequency ? "Actualizar ✏️" : "Enviar 📤"}
          </button>
          {monitoring.frequency && (
            <button
              type="button"
              style={{
                backgroundColor: "red",
              }}
              onClick={handleDelete}
            >
              Eliminar ✖️
            </button>
          )}
        </div>
        <br />
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: responseSuccess ? "#6dd772" : "#ff5c4b",
          }}
        >
          {responseMessage}
        </div>
      </form>
    </div>
  );
}

export default MonitoringView;
