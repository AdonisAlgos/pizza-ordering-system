import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Username" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
      </div>
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
