import axios from "axios";

export const getPizzas = () => {
  return axios.get(`http://localhost:5100/pizzas`);
};

export const registerUser = (data) => {
  return axios.post(`http://localhost:5100/register`, data);
};
