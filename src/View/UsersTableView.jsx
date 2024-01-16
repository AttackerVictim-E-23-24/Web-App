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
                  <th className="">usar</th>
                  <th className="column-full-name">Nombre completo</th>
                  <th className="column-cedula">Cédula</th>
                  <th className="column-age">Edad</th>
                  <th className="column-birth-date">Fecha de nacimiento</th>
                  <th className="column-username">Nombre de usuario</th>
                  <th className="column-email">Email</th>
                  <th className="column-role">Rol</th>
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
                      <form
                        onSubmit={(e) => handleSubmit(e, user.getUserName())}
                      >
                        <td className="">
                          <button type="submit">👤</button>
                        </td>
                        <td className="column-full-name">
                          <span>{user.getFullName()}</span>
                        </td>
                        <td className="column-cedula">
                          <span>{user.getCedula()}</span>
                        </td>
                        <td className="column-age">
                          <span>{user.getAge()}</span>
                        </td>
                        <td className="column-birth-date">
                          <span>{user.getBirthDate()}</span>
                        </td>
                        <td className="column-username">
                          <span>{user.getUserName()}</span>
                        </td>
                        <td className="column-email">
                          <span>{user.getEmail()}</span>
                        </td>
                        <td className="column-role">
                          <span>{user.getRole()}</span>
                        </td>
                        <td className="column-address">
                          <span>{user.getDireccion()}</span>
                        </td>
                        <td className="column-registration-date">
                          <span>{user.getRegistrationDate()}</span>
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
