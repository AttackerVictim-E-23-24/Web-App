// UsersTableView.jsx
import React from "react";
import "../Pages/css/UsersTableView.css";

function UsersTableView({ users, handleInputChange, handleSubmit }) {
  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <td>
                <div className="row-container">
                  <th className="column-age">usar</th>
                  <th className="column-full-name">Nombre completo</th>
                  <th className="column-cedula">Cédula</th>
                  <th className="column-age">Edad</th>
                  <th className="column-birth-date">Fecha de nacimiento</th>
                  <th className="column-username">Nombre de usuario</th>
                  <th className="column-email">Email</th>
                  <th className="column-role">Rol</th>
                  <th className="column-imei">IMEI</th>
                  <th className="column-address">Dirección</th>
                  <th className="column-registration-date">
                    Fecha de registro
                  </th>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.getId()} className="table-row">
                  <td>
                    <div className="row-container">
                      <form onSubmit={(e) => handleSubmit(e, user.getUserName())}>
                        <td className="column-age">
                          <button type="submit"></button>
                        </td>
                        <td className="column-full-name">
                          <input
                            type="text"
                            name="fullName"
                            defaultValue={user.getFullName()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-cedula">
                          <input
                            type="text"
                            name="cedula"
                            defaultValue={user.getCedula()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-age">
                          <input
                            type="text"
                            name="age"
                            defaultValue={user.getAge()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-birth-date">
                          <input
                            type="date"
                            name="birthDate"
                            defaultValue={user.getBirthDate()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-username">
                          <input
                            type="text"
                            name="userName"
                            defaultValue={user.getUserName()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-email">
                          <input
                            type="email"
                            name="email"
                            defaultValue={user.getEmail()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-role">
                          <input
                            type="text"
                            name="role"
                            defaultValue={user.getRole()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-imei">
                          <input
                            type="text"
                            name="imei"
                            defaultValue={user.getImei()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-address">
                          <input
                            type="text"
                            name="direccion"
                            defaultValue={user.getDireccion()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                        <td className="column-registration-date">
                          <input
                            type="date"
                            name="registrationDate"
                            defaultValue={user.getRegistrationDate()}
                            onChange={(e) => handleInputChange(e, user.getId())}
                          />
                        </td>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTableView;
