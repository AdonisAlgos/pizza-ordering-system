import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./Login.page";

test("renders login page and checks for username, password fields and login, register buttons", () => {
  render(<LoginPage />);

  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByText("Login");
  const registerButton = screen.getByText("Register");

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});
