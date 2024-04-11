import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div class="container vh-100 d-flex align-items-center justify-content-center">
      <div class="row w-100">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h1 class="text-center mb-4">Welcome</h1>
          <form>
            <div class="form-group mb-3">
              <input type="text" class="form-control" placeholder="Username" />
            </div>
            <div class="form-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div class="d-flex justify-content-center">
              <button class="btn btn-primary me-2">Login</button>
              <button class="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
