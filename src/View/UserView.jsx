// UserView.jsx
import React from "react";
import "../Pages/css/userView.css";

function UserView({ user, handleInputChange, handleSubmit }) {
  return (
    <div>
      <form method="POST" onSubmit={(event) => handleSubmit(event)}>
        <br />
        <br />

        <div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="firstName">Primer nombre del {user.role}</label>
              <input
                id="firstName"
                name="firstName"
                onChange={handleInputChange}
                placeholder="Juan"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="secondName">Segundo nombre del {user.role}</label>
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
              <label htmlFor="lastName">Primer apellido del {user.role}</label>
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
                Segundo apellido del {user.role}
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
              <label htmlFor="birthDate">
                Fecha de nacimiento del {user.role}
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="cedula">Cédula del {user.role}</label>
              <input
                id="cedula"
                name="cedula"
                onChange={handleInputChange}
                placeholder="12345678"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="username">
                Nombre de usuario del {user.role}
              </label>
              <input
                id="username"
                name="username"
                onChange={handleInputChange}
                placeholder="juangomez"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="password">Contraseña del {user.role}</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleInputChange}
                placeholder="contraseña"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="email">Correo electrónico del {user.role}</label>
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
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UserView;
