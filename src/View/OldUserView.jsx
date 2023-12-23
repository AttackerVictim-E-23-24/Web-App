// UserView.jsx
import React from "react";
import "../Pages/css/OldUserView.css";

function OldUserView({ user, handleInputChange, handleSubmit }) {
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
              <label htmlFor="cedula">Cédula del {user.role}</label>
              <input
                id="cedula"
                name="cedula"
                onChange={handleInputChange}
                placeholder="12345678"
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="userName">
                Nombre de usuario del {user.role}
              </label>
              <input
                id="userName"
                name="userName"
                onChange={handleInputChange}
                placeholder="juangomezca"
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
            <div className={`field field-${user.role}`}>
              <label htmlFor="imei">IMEI del {user.role}</label>
              <input
                id="imei"
                name="imei"
                onChange={handleInputChange}
                placeholder="123456789012345"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="startBirthDate">
                Fecha de inicio de nacimiento del {user.role}
              </label>
              <input
                id="startBirthDate"
                name="startBirthDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="endBirthDate">
                Fecha de fin de nacimiento del {user.role}
              </label>
              <input
                id="endBirthDate"
                name="endBirthDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className={`field field-${user.role}`}>
              <label htmlFor="startRegistrationDate">
                Fecha de inicio de registro del {user.role}
              </label>
              <input
                id="startRegistrationDate"
                name="startRegistrationDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={`field field-${user.role}`}>
              <label htmlFor="endRegistrationDate">
                Fecha de fin de registro del {user.role}
              </label>
              <input
                id="endRegistrationDate"
                name="endRegistrationDate"
                type="date"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="">
            <div className={`field field-${user.role}`}>
              <label htmlFor="address">
                Direccion de domicilio del {user.role}
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
      </form>
    </div>
  );
}

export default OldUserView;
