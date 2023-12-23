import React, { useState } from "react";
import OldUserController from "../Controller/OldUserController";
import "../Pages/css/home.css";

function ExistingUserPage() {
  const [role, setRole] = useState('agresor');


  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="user-view-container">
          <h2>Consulta de usuario</h2>
          <div className="role-selection">
            <select value={role} onChange={handleRoleChange}>
              <option value="victima">Victima</option>
              <option value="agresor">Agresor</option>
            </select>
          </div>
          <br />
          <br />
          <br />
          <hr />
          <OldUserController role={role} />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ExistingUserPage;
