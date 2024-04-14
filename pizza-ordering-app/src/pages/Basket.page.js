import { React } from "react";
import { useCart } from "../contexts/Basket.context";

const BasketPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="flex-column flex: 1 container d-flex align-items-center justify-content-center">
      <h3 className="text-center mb-4">Basket</h3>
      <div className="container mt-4">
        {cartItems.map((pizza, index) => (
          <div key={index} className="row mb-3">
            <div className="col-12">
              <h3>{pizza.name}</h3>
              <div>
                Main Ingredients include: {pizza.ingredients[0]},{" "}
                {pizza.ingredients[1]}, {pizza.ingredients[2]}...
              </div>
              <br />
              <div className="position-relative" style={{ paddingTop: "100%" }}>
                <img
                  className="img-fluid position-absolute top-0 start-0 w-100 h-100"
                  src={pizza.image}
                  alt={pizza.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasketPage;
