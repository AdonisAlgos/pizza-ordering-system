import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./Login.page";

test("renders login page and checks for username, password fields and login, register buttons", () => {
  render(<LoginPage />);

  const username = screen.getByPlaceholderText("Username");
  const password = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: "Login" });
  const registerButton = screen.getByRole("button", { name: "Register" });


  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});
