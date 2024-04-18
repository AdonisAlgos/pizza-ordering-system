import axios from "axios";

export const loginAuthentication = (data) => {
  return axios.post(`http://localhost:5100/login`, data);
};
