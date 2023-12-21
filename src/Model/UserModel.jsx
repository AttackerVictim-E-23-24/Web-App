// User.js
class UserModel {
    constructor(firstName, secondName, lastName, secondLastName, birthDate, cedula, username, password, email, role, registrationDate) {
      this.firstName = firstName;
      this.secondName = secondName;
      this.lastName = lastName;
      this.secondLastName = secondLastName;
      this.birthDate = birthDate;
      this.cedula = cedula;
      this.username = username;
      this.password = password;
      this.email = email;
      this.role = role;
      this.registrationDate = registrationDate;
    }
}

export default UserModel;