import HomePage from "./Home.page";
import { render, screen, fireEvent } from "@testing-library/react";


test("renders home page and checks for login, register, and order buttons", () => {
    render(<HomePage />);
  
    const loginButton = screen.getByRole("button", { name: "Login" });
    const registerButton = screen.getByRole("button", { name: "Register" });
    const orderButton = screen.getByRole("button", { name: "Order" });
  
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(orderButton).toBeInTheDocument();
  });
  