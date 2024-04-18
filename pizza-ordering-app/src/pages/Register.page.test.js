import RegisterPage from "./Register.page";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders register page", () => {
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

  const customerName = screen.getByTestId("name");
  const customerLastName = screen.getByTestId("last name");
  const email = screen.getByTestId("email");
  const password = screen.getByTestId("password");
  const street = screen.getByTestId("street");
  const city = screen.getByTestId("city");
  const postcode = screen.getByTestId("postcode");
  const loginButton = screen.getByRole("button", { name: "Register" });

  expect(customerName).toBeInTheDocument();
  expect(customerLastName).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(street).toBeInTheDocument();
  expect(city).toBeInTheDocument();
  expect(postcode).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
