// UserView.jsx
import React, { useContext } from "react";
import "../Pages/css/UserView.css";
import GeneralContext from "../GeneralContext";

function UserView({
  user,
  handleInputChange,
  handleSubmit,
  responseMessage,
  responseSuccess,
}) {
  const roleLabel = user.role === "victima" ? "de la víctima" : "del agresor";
  const { userVictim, userAttacker } = useContext(GeneralContext);
  const roleData = user.role === "victima" ? userVictim : userAttacker;

  return (
    <div>
      <form id="userForm" method="POST" onSubmit={handleSubmit}>
        <br />
        <br />

        <div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="firstName">Primer nombre {roleLabel}</label>
              <input
                id="firstName"
                name="firstName"
                value={user.firstName || ""}
                onChange={handleInputChange}
                placeholder="Juan"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="secondName">Segundo nombre {roleLabel}</label>
              <input
                id="secondName"
                name="secondName"
                value={user.secondName || ""}
                onChange={handleInputChange}
                placeholder="Pérez"
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="lastName">Primer apellido {roleLabel}</label>
              <input
                id="lastName"
                name="lastName"
                value={user.lastName || ""}
                onChange={handleInputChange}
                placeholder="Gómez"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="secondLastName">
                Segundo apellido {roleLabel}
              </label>
              <input
                id="secondLastName"
                name="secondLastName"
                value={user.secondLastName || ""}
                onChange={handleInputChange}
                placeholder="Rodríguez"
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="cedula">Cédula {roleLabel}</label>
              <input
                id="cedula"
                name="cedula"
                value={user.cedula || ""}
                onChange={handleInputChange}
                placeholder="12345678"
                required
              />
            </div>
            {roleData.firstName ? null : (
              <div className={`field field-${user.role}`}>
                <label htmlFor="email">Correo electrónico {roleLabel}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email || ""}
                  onChange={handleInputChange}
                  placeholder="juangomez@example.com"
                  required
                />
              </div>
            )}
          </div>
          {roleData.firstName ? null : (
            <div className="row">
              <div className={`field field-${user.role}`}>
                <label htmlFor="userName">Nombre de usuario {roleLabel}</label>
                <input
                  id="userName"
                  name="userName"
                  value={user.userName || ""}
                  onChange={handleInputChange}
                  placeholder="juangomezca"
                  required
                />
              </div>
              <div className={`field field-${user.role}`}>
                <label htmlFor="password">Clave {roleLabel}</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                  autoComplete="a"
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="birthDate">Fecha de nacimiento {roleLabel}</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={user.birthDate || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="address">
                Direccion de domicilio {roleLabel}
              </label>
              <input
                id="address"
                name="address"
                onChange={handleInputChange}
                placeholder="Av/calle/casa abcd 1234"
                required
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: roleData.firstName ? "green" : undefined,
            }}
          >
            {roleData.firstName ? "Actualizar ✏️" : "Enviar 📤"}
          </button>
        </div>
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: responseSuccess ? "#6dd772" : "#ff5c4b",
          }}
        >
          {responseMessage}{" "}
        </div>
      </form>
    </div>
  );
}

export default UserView;
