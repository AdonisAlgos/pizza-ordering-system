import { React } from "react";
import { useCart } from "../contexts/Basket.context";
import "./Basket.page.css";

const BasketPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h3 className="text-center mb-4">Basket</h3>
      {cartItems.map((pizza, index) => (
        <div
          key={index}
          className="mb-3 d-flex flex-row p-1 col-lg-8 col-md-10 col-sm-12 basket-item"
        >
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="img-fluid w-100"
              src={pizza.image}
              alt={pizza.name}
              style={{ height: "150px", width: "150px", objectFit: "cover" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center flex-fill p-2"
            style={{ width: "50%" }}
          >
            <h5>{pizza.name}</h5>
            <p>Main Ingredients: {pizza.ingredients.join(", ")}</p>
          </div>
          <div
            className="d-flex flex-column justify-content-center p-1"
            style={{ width: "20%" }}
          >
            <p>Size: {pizza.size}</p>
            <p>Price: {pizza.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketPage;
