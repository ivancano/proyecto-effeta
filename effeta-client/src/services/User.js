import axios from "axios";
import Base from "./Base";

const UserService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post(Base.url + "api/v1/users/login", {uid: email, password: password})
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("Se produjo un error, compruebe usuario y contraseña");
      });
    });
  },
  register: (email, password) => {
    return new Promise((resolve, reject) => {
      axios.post(Base.url + "api/v1/users/register", 
      {
        email: email, 
        username: email, 
        password: password,
        password_confirmation: password
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("Error");
      });
    });
  }
}

export default UserService;