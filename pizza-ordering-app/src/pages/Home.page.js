import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/pizzas`)
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
      {/* Grid starts here */}
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
              <div className="bg-danger p-3">
                <div>...</div>
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


export default HomePage