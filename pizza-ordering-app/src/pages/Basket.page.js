import { React, useState } from "react";
import { useCart } from "../contexts/Basket.context";
import "./Basket.page.css";
import SpinnerComponent from "../components/Spinner.component";
import { useUser } from "../contexts/User.context";

const BasketPage = () => {
  const { user } = useUser();
  const { cartItems, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const processOrder = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      clearCart();
    }, 2000); // Popup shows for 2 seconds
  };

  const handleCompleteOrder = () => {
    if (user) {
      processOrder();
    } else if (street && city && postcode) {
      processOrder();
    } else {
      alert(
        "Please log in or fill in all address fields to complete the order."
      );
    }
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
                <p>Price: £{pizza.price}</p>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-start pt-3 col-lg-8 col-md-10 col-12">
            {user ? (
              <div className="d-flex flex-column gap-2">
                <div>Street: {user.streetAddress}</div>
                <div>City: {user.city}</div>
                <div>Postcode {user.postcode}</div>
              </div>
            ) : (
              <div className="w-100">
                <div className="form-group mb-3">
                  <input
                    data-testid="street"
                    type="text"
                    placeholder="Street Address"
                    className="form-control"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    data-testid="city"
                    type="text"
                    placeholder="City"
                    className="form-control"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    data-testid="postcode"
                    type="text"
                    placeholder="Postcode"
                    className="form-control"
                    required
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center pt-3 col-lg-8 col-md-10 col-12">
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
