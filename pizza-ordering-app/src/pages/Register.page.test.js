import RegisterPage from "./Register.page";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders register page", () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );
});
