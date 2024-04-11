import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand navbar-light fixed-top"
      style={{
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
      }}
    >
      {" "}
      {/* Added the custom class here */}
      <div className="d-flex col-10 col-md-8 mx-auto">
        <a className="nav-link p-2" href="/">
          Home
        </a>
        <div className="d-flex justify-content-end w-100">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/basket" className="nav-link">
                Basket
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">|</span>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
