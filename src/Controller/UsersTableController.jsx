// UsersTableController.jsx
import React, { useEffect, useState } from "react";
import UsersTableView from "../View/UsersTableView";
import { BaseURL } from "./BaseURL";

function UsersTableController() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${BaseURL.apiUrl}/users/getAllUsers`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <UsersTableView
      users={users}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default UsersTableController;
