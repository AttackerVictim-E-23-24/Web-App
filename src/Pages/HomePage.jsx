// HomePage.jsx
import React from "react";
import UsersTableController from "../Controller/UsersTableController";
import "../Pages/css/home.css";

function HomePage() {

  return (
    <div className="main-container">
      <div className="content">
        <div className="user-view-container">
          <h2>Usuarios</h2>
          <UsersTableController />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default HomePage;
