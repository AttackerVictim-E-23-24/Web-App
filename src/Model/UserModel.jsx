// User.js
class UserModel {
    constructor(firstName, secondName, lastName, secondLastName, birthDate, cedula, userName, password, email, role, imei,userTypeDto,direccion, registrationDate) {
      this.firstName = firstName;
      this.secondName = secondName;
      this.lastName = lastName;
      this.secondLastName = secondLastName;
      this.birthDate = birthDate;
      this.cedula = cedula;
      this.userName = userName;
      this.password = password;
      this.email = email;
      this.role = role;
      this.imei = imei;
      this.userTypeDto = userTypeDto;
      this.direccion = direccion;
      this.registrationDate = registrationDate;
    }
    
    getFullName() {
      return `${this.firstName} ${this.secondName} ${this.lastName} ${this.secondLastName}`;
    }

    getAge() {
      const today = new Date();
      const birthDate = new Date(this.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    isValidEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    }

    changePassword(newPassword) {
      this.password = newPassword;
    }
}

export default UserModel;