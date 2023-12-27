import UserModel from "./UserModel.jsx";

class UsersModel {
  constructor() {
    this.usersList = [];
  }

  addUser(user) {
    if (user instanceof UserModel) {
      this.usersList.push(user);
    } else {
      throw new Error("The user must be an instance of User");
    }
  }

  getUsers() {
    return this.usersList;
  }
}

export default UsersModel;