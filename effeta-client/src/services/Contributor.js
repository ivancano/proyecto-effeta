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
        user_id: params.userId,
        type: params.type
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
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
        reject(err);
      });
    });
  },
  update: (params) => {
    return new Promise((resolve, reject) => {
      axios.put(Base.url + "api/v1/contributors/" + params.id,
      {
        name: params.name,
        lastname: params.lastname,
        email: params.email,
        dni: params.dni,
        phone: params.phone,
        address: params.address,
        user_id: params.id,
        type: params.type
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(Base.url + "api/v1/contributors/" + id)
      .then((data) => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}

export default ContributorService;