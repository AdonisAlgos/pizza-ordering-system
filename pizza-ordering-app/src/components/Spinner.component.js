import React from "react";
import spinnerImg from "../assets/animations/spinner.gif";

const SpinnerComponent = () => {
  return (
    <div className="d-flex justify-content-center allign-items-center">
      <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
    </div>
  );
};

export default SpinnerComponent;
