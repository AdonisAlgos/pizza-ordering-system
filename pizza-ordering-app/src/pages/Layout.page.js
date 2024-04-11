import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.component";

const LayoutPage = () => {
  return (
    <div>
      <NavBar />
      <section style={{ paddingTop: "5rem" }}>
        <Outlet />
      </section>
    </div>
  );
};

export default LayoutPage;
