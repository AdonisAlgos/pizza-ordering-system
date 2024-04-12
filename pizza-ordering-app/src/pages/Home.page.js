import React from "react";
import { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPizzas } from "../apis/getPizzas";
import { images } from "../components/Images";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    getPizzas()
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizzas:", error);
      });
  }, []);

  return (
    <div>
      <h1
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          fontFamily: "'Pacifico', cursive",
          height: "150px",
        }}
      >
        Best Stone Oven Pizza in London
      </h1>

      <div className="container mt-4">
        <div className="row">
          {pizzas.map((pizza, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
              <div>{pizza.name}</div>
              <div>
                {pizza.ingredients.slice(0, 3).map((ingredient, index) => (
                  <div key={index}>{ingredient}</div>
                ))}
              </div>
              <div>...</div>
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
                  backgroundColor: "black",
                  color: "white",
                  opacity: 0.8,
                }}
                className="d-flex gap-3"
              >
                <div>Small {pizza.sizes[0].price}</div>
                <div>Medium {pizza.sizes[1].price}</div>
                <div>Large {pizza.sizes[2].price}</div>
              </div>
              <button
                style={{ borderColor: "lightGrey" }}
                className="btn btn-primary mt-3 bg-white"
              >
                {<FontAwesomeIcon icon={faPlus} color="red" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
