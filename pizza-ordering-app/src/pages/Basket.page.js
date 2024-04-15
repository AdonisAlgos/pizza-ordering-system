// import { React } from "react";
// import { useCart } from "../contexts/Basket.context";

// const BasketPage = () => {
//   const { cartItems } = useCart();

//   return (
//     <div className="container">
//       <h3 className="text-center mb-4">Basket</h3>
//       {cartItems.map((pizza, index) => (
//         <div key={index} className="row mb-3 row-md-6 row-sm-8 row-4">
//           <img
//             className="img-fluid"
//             src={pizza.image}
//             alt={pizza.name}
//             style={{ height: "150px", objectFit: "cover" }}
//           />
//           <div>
//             <h5>{pizza.name}</h5>
//             <p className="mb-1">
//               Main Ingredients: {pizza.ingredients.join(", ")}
//             </p>{" "}
//           </div>
//           <div>
//             <p className="mb-1">Size: {pizza.size}</p>
//             <p className="mb-1">Price: {pizza.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BasketPage;

import { React } from "react";
import { useCart } from "../contexts/Basket.context";

const BasketPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h3 className="text-center mb-4">Basket</h3>
      {cartItems.map((pizza, index) => (
        <div
          key={index}
          className="mb-3 d-flex p-1 col-lg-8 col-md-10 col-sm-12"
          style={{ maxHeight: "min-content" }}
        >
          <div>
            <img
              className="img-fluid"
              src={pizza.image}
              alt={pizza.name}
              style={{ height: "150px", objectFit: "cover" }}
            />
          </div>
          <div className="p-1">
            <h5>{pizza.name}</h5>
            <p>Main Ingredients: {pizza.ingredients.join(", ")}</p>
          </div>
          <div className="p-1">
            <p>Size: {pizza.size}</p>
            <p>Price: {pizza.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketPage;
