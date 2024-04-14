import React from "react";
import { render, screen } from "@testing-library/react";
import BasketPage from "./Basket.page";
import { useCart } from "../contexts/Basket.context";

// Mocking the useCart hook
jest.mock("../contexts/Basket.context", () => ({
  useCart: jest.fn(),
}));

describe("BasketPage", () => {
  it("renders without crashing", () => {
    useCart.mockReturnValue({ cartItems: [] });
    render(<BasketPage />);
    expect(screen.getByText("Basket")).toBeInTheDocument();
  });

  it("displays items in the cart", () => {
    const mockCartItems = [
      {
        name: "Margherita",
        ingredients: ["Tomato", "Mozzarella", "Basil"],
        image: "path/to/margherita.jpg",
      },
      {
        name: "Pepperoni",
        ingredients: ["Pepperoni", "Cheese", "Tomato Sauce"],
        image: "path/to/pepperoni.jpg",
      },
    ];
    useCart.mockReturnValue({ cartItems: mockCartItems });

    render(<BasketPage />);
    expect(screen.getByText("Margherita")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
    expect(screen.getByText(/Tomato, Mozzarella, Basil/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Pepperoni, Cheese, Tomato Sauce/i)
    ).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "path/to/margherita.jpg");
    expect(images[1]).toHaveAttribute("src", "path/to/pepperoni.jpg");
  });

  it("handles empty cart gracefully", () => {
    useCart.mockReturnValue({ cartItems: [] });
    render(<BasketPage />);
    expect(screen.getByText("Basket")).toBeInTheDocument();
    expect(screen.queryByText("Margherita")).not.toBeInTheDocument();
  });
});
