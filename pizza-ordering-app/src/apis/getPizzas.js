import axios from "axios";

export const getPizzas = () => {
  return axios.get(`http://localhost:5100/pizzas`);
};
