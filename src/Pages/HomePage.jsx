import React, { useState } from "react";
import UserController from "../Controller/UserController";
import "../Pages/css/home.css";

function AdminPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [role, setRole] = useState("admin");

  const handleUserTypeChange = (event) => {
    setIsNewUser(event.target.value === "new");
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="user-view-container">
          <h2>Datos de administrador</h2>
          <div className="role-selection">
            <select value={role} onChange={handleRoleChange}>
              <option value="admin">Administrador</option>
              <option value="victim">Victima</option>
              <option value="agresor">Agresor</option>
            </select>
          </div>
          <br />
          <br />
          <br />
          <div className="user-type">
            <button
              className={isNewUser ? "active" : ""}
              value="new"
              onClick={handleUserTypeChange}
            >
              Nuevo
            </button>
            <button
              className={!isNewUser ? "active" : ""}
              value="existing"
              onClick={handleUserTypeChange}
            >
              Existente
            </button>
          </div>
          <UserController role={role} />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default AdminPage;
