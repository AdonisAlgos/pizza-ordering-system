import React from "react";
import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPizzas } from "../apis/getPizzas";
import { images } from "../components/PizzaImages";
import { useCart } from "../contexts/Basket.context";
import "./Home.page.css";
import CYOPizzaComponent from "../components/CYOPizza.component";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    getPizzas()
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  const handleAddToCart = (pizza, sizeIndex) => {
    const itemToAdd = {
      name: pizza.name,
      ingredients: pizza.ingredients,
      size: pizza.sizes[sizeIndex].size,
      price: pizza.sizes[sizeIndex].price,
      image: images[pizza.name.toLowerCase().replace(/\s/g, "")]
        ? images[pizza.name.toLowerCase().replace(/\s/g, "")]
        : images["default"],
    };
    addToCart(itemToAdd);
  };

  return (
    <div className="flex-column flex: 1 container d-flex align-items-center justify-content-center">
      <h1
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          fontFamily: "'Pacifico', cursive",
          height: "150px",
        }}
      >
        Best stone oven pizza selections menu
      </h1>

      <div className="container mt-4">
        <div className="row">
          {pizzas.map((pizza, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
              <h3>{pizza.name}</h3>
              <div>
                Main Ingredients include: {pizza.ingredients[0]},{" "}
                {pizza.ingredients[1]}, {pizza.ingredients[2]}...
              </div>
              <br />
              <div className="position-relative" style={{ paddingTop: "100%" }}>
                <img
                  className="img-fluid position-absolute top-0 start-0 w-100 h-100"
                  src={
                    images[pizza.name.toLowerCase().replace(/\s/g, "")]
                      ? images[pizza.name.toLowerCase().replace(/\s/g, "")]
                      : images["default"]
                  }
                  alt={pizza.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgb(242, 242, 242)",
                }}
                className="d-flex p-2 gap-2 justify-content-around"
              >
                {pizza.sizes.map((size, sizeIndex) => (
                  <div
                    key={sizeIndex}
                    className="d-flex flex-column align-items-center justify-content-center w-100"
                  >
                    <div>{size.size}</div>
                    <div>£{size.price}</div>
                    <button
                      onClick={() => handleAddToCart(pizza, sizeIndex)}
                      style={{ borderColor: "lightGrey" }}
                      className="btn btn-primary mt-3 bg-white w-100 transform-h-1y shadow-h"
                      data-testid="add-to-cart-button"
                    >
                      <FontAwesomeIcon icon={faPlus} color="black" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CYOPizzaComponent />
    </div>
  );
};

export default HomePage;
