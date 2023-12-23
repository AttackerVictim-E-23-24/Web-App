// UsersTableView.jsx
import React from 'react';

function UsersTableView({ users, handleInputChange, handleSubmit }) {
  return (
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
        {users.map(user => (
          <tr key={user.id}>
            <form onSubmit={(e) => handleSubmit(e, user.id)}>
              <td><input type="text" name="fullName" defaultValue={user.getFullName()} onChange={handleInputChange} /></td>
              <td><input type="text" name="cedula" defaultValue={user.cedula} onChange={handleInputChange} /></td>
              <td><input type="text" name="age" defaultValue={user.getAge()} onChange={handleInputChange} /></td>
              <td><input type="date" name="birthDate" defaultValue={user.birthDate} onChange={handleInputChange} /></td>
              <td><input type="text" name="userName" defaultValue={user.userName} onChange={handleInputChange} /></td>
              <td><input type="email" name="email" defaultValue={user.email} onChange={handleInputChange} /></td>
              <td><input type="text" name="role" defaultValue={user.role} onChange={handleInputChange} /></td>
              <td><input type="text" name="imei" defaultValue={user.imei} onChange={handleInputChange} /></td>
              <td><input type="text" name="direccion" defaultValue={user.direccion} onChange={handleInputChange} /></td>
              <td><input type="date" name="registrationDate" defaultValue={user.registrationDate} onChange={handleInputChange} /></td>
              <td><button type="submit">Actualizar</button></td>
            </form>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTableView;