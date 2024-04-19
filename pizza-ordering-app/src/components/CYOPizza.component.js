import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contexts/Basket.context";
import { images } from "../components/IngredientImages";
import "./CYOPizza.component.css";

const CYOPizzaComponent = () => {
  const sizePrices = {
    small: 11.99,
    medium: 14.99,
    large: 16.99,
  };

  const [pizza, setPizza] = useState({
    name: "Create Your Own",
    size: "",
    ingredients: [],
    price: 0,
  });

  const toppingsWithImages = [
    { name: "Pepperoni", image: images.pepperoni },
    { name: "Mushrooms", image: images.mushrooms },
    { name: "Onions", image: images.onions },
    { name: "Olives", image: images.olives },
    { name: "Peppers", image: images.peppers },
  ];

  const { addToCart } = useCart();

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPizza((prev) => ({
      ...prev,
      [name]: value,
      price: sizePrices[value.toLowerCase()] || 0,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setPizza((prev) => {
      const newToppings = checked
        ? [...prev.ingredients, value]
        : prev.ingredients.filter((topping) => topping !== value);
      return { ...prev, ingredients: newToppings };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCart(pizza);
    setPizza({ name: "Create Your Own", size: "", ingredients: [], price: 0 });
  };

  return (
    <div className="container mt-4">
      <h1
        className="text-center mb-4"
        style={{ fontFamily: "'Pacifico', cursive", height: "150px" }}
      >
        You pick it, we cook it!
      </h1>
      <p className="lead">Choose your size, sauce, cheese, and toppings</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size:
          </label>
          <select
            name="size"
            id="size"
            className="form-select"
            value={pizza.size}
            onChange={handleSelectChange}
          >
            <option value="">Select pizza size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="row mb-3">
          {toppingsWithImages.map((topping) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 custom-hover"
              key={topping.name}
            >
              <div
                className="form-check"
                style={{
                  backgroundColor: "rgb(242, 242, 242)",
                  height: "120px",
                }}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  style={{ width: "20px", height: "94%" }}
                  id={topping.name}
                  value={topping.name}
                  checked={pizza.ingredients.includes(topping.name)}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label d-flex align-items-center"
                  htmlFor={topping.name}
                >
                  <img
                    src={topping.image}
                    alt={topping.name}
                    className="img-fluid me-2"
                    style={{ width: "120px", height: "100%" }}
                  />
                  {topping.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          style={{ borderColor: "lightGrey" }}
          className="btn btn-primary mt-3 bg-white w-100 custom-hover"
          data-testid="add-to-cart-button"
        >
          <FontAwesomeIcon icon={faPlus} color="black" />
        </button>
      </form>
    </div>
  );
};

export default CYOPizzaComponent;
