import React from "react";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      <nav>nav</nav>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
