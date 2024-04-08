import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  return (
    <form>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Username" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary me-2">Login</button>
        <button class="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default LoginPage;
