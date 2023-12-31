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
              <th>Nombre completo</th>
              <th>Cédula</th>
              <th>Edad</th>
              <th>Fecha de nacimiento</th>
              <th>Nombre de usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>IMEI</th>
              <th>Dirección</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.getId()} className="table-row">
                  <td colSpan="11">
                    <form onSubmit={(e) => handleSubmit(e, user.getId())}>
                      <td>
                        <input
                          type="text"
                          name="fullName"
                          defaultValue={user.getFullName()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="cedula"
                          defaultValue={user.getCedula()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="age"
                          defaultValue={user.getAge()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="birthDate"
                          defaultValue={user.getBirthDate()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="userName"
                          defaultValue={user.getUserName()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          defaultValue={user.getEmail()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="role"
                          defaultValue={user.getRole()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="imei"
                          defaultValue={user.getImei()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="direccion"
                          defaultValue={user.getDireccion()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="registrationDate"
                          defaultValue={user.getRegistrationDate()}
                          onChange={(e) => handleInputChange(e, user.getId())}
                        />
                      </td>
                    </form>
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
