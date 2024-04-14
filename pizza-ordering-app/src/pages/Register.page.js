import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex: 1 container d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <h3 className="text-center mb-4">Registration</h3>
          <form>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Last Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="user@example.com"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Street Address</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>City</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label>Postcode</label>
              <input type="text" className="form-control" />
            </div>
            <small id="reg" className="form-text text-muted">
              <Link to="/login">Already have an account? Try logging in!</Link>
            </small>
            <div className="d-flex justify-content-center pt-3">
              <button className="btn btn-primary w-100">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
