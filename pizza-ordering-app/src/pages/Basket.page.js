import { React, useState } from "react";
import { useCart } from "../contexts/Basket.context";
import "./Basket.page.css";
import SpinnerComponent from "../components/Spinner.component";

const BasketPage = () => {
  const { cartItems, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleCompleteOrder = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      clearCart();
    }, 2000); // Popup shows for 2 seconds
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h3 className="text-center mb-4">Basket</h3>
      {cartItems.length === 0 ? (
        <p>Your basket is empty</p>
      ) : (
        <>
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
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                  }}
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
          <div className="d-flex justify-content-center pt-3 col-lg-8 col-md-10 col-sm-12">
            <button
              className="btn btn-primary w-100"
              onClick={handleCompleteOrder}
            >
              Complete Order
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div className="popup">
          <SpinnerComponent />
          <div>Processing your order...</div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
