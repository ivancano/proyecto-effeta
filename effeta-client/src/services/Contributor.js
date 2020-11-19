import axios from "axios";
import Base from "./Base";

const ContributorService = {
  store: (params) => {
    return new Promise((resolve, reject) => {
      axios.post(Base.url + "api/v1/contributors", 
      {
        name: params.name, 
        lastname: params.lastname,
        email: params.email,
        dni: params.dni,
        phone: params.phone,
        address: params.address,
        user_id: params.userId
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("Error");
      });
    });
  },
  list: () => {
    return new Promise((resolve, reject) => {
      axios.get(Base.url + "api/v1/contributors")
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject("Error");
      });
    });
  }
}

export default ContributorService;