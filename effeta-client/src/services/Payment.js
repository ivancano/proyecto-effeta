import axios from "axios";
import Base from "./Base";

const PaymentService = {
  store: (params) => {
    return new Promise((resolve, reject) => {
      axios.post(Base.url + "api/v1/payments",
      {
        source: params.source,
        amount: params.amount,
        contribution_id: params.contribution_id,
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
      axios.get(Base.url + "api/v1/payments")
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
      axios.put(Base.url + "api/v1/payments/" + params.id,
      {
        source: params.source,
        amount: params.amount,
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
      axios.delete(Base.url + "api/v1/payments/" + id)
      .then((data) => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}

export default PaymentService;