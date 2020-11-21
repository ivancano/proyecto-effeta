import axios from "axios";
import Base from "./Base";

const ContributionService = {
  store: (params) => {
    return new Promise((resolve, reject) => {
      axios.post(Base.url + "api/v1/contributions",
      {
        detail: params.detail,
        type: params.type,
        due_date: params.due_date,
        amount: params.amount,
        contributor_id: params.contributor_id,
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
      axios.get(Base.url + "api/v1/contributions")
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
      axios.put(Base.url + "api/v1/contributions/" + params.id,
      {
        detail: params.detail,
        type: params.type,
        due_date: params.due_date,
        amount: params.amount
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
      axios.delete(Base.url + "api/v1/contributions/" + id)
      .then((data) => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}

export default ContributionService;