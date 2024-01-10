// UserView.jsx
import React from "react";
import "../Pages/css/UserView.css";

function UserView({
  user,
  handleInputChange,
  handleSubmit,
  responseMessage,
  responseSuccess,
}) {
  const roleLabel = user.role === 'victima' ? 'de la víctima' : 'del agresor';
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
                onChange={handleInputChange}
                placeholder="12345678"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="email">Correo electrónico {roleLabel}</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleInputChange}
                placeholder="juangomez@example.com"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="userName">
                Nombre de usuario {roleLabel}
              </label>
              <input
                id="userName"
                name="userName"
                onChange={handleInputChange}
                placeholder="juangomezca"
                required
                autoComplete="username"
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="password">
                Nombre de usuario {roleLabel}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="******"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="imei">IMEI {roleLabel}</label>
              <input
                id="imei"
                name="imei"
                onChange={handleInputChange}
                placeholder="123456789012345"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="birthDate">
                Fecha de nacimiento {roleLabel}
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="">
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
        <button type="submit">Enviar</button>
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
