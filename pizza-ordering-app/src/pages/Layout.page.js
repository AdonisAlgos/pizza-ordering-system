import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.component";
import FooterComponent from "../components/Footer.component";

const LayoutPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {" "}
      <NavBar />
      <section
        className="d-flex"
        style={{
          marginTop: "56px",
          padding: "2rem",
          minHeight: "calc(100vh - 56px - 6rem)",
        }}
      >
        <Outlet />
      </section>
      <FooterComponent />
    </div>
  );
};


export default LayoutPage;
