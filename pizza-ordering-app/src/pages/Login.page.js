import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h1 className="text-center mb-4">Welcome</h1>
          <form>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary me-2">Login</button>
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
