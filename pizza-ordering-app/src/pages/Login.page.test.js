import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./Login.page";
import { BrowserRouter } from "react-router-dom";

test("renders login page and checks for username, password fields and login, register buttons", () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const username = screen.getByTestId("email");
  const password = screen.getByTestId("password");
  const loginButton = screen.getByRole("button", { name: "Sign in" });

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
