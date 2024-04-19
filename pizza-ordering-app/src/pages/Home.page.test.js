import React from "react";
import HomePage from "./Home.page";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { getPizzas } from "../apis/getPizzas";
import { useCart } from "../contexts/Basket.context";

jest.mock("../apis/getPizzas");
jest.mock("../contexts/Basket.context", () => ({
  useCart: jest.fn(),
}));
jest.mock("../components/PizzaImages", () => ({
  images: {
    default: "default.webp",
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
  getPizzas.mockResolvedValue({ data: [] }); // Assume no pizzas by default
  useCart.mockImplementation(() => ({
    addToCart: jest.fn(),
  }));
});

test("successfully renders home page", async () => {
  render(<HomePage />);

  await waitFor(() => {
    expect(
      screen.getByText(/Best stone oven pizza selections menu/i)
    ).toBeInTheDocument();
  });
});

test("fetches and displays pizza data", async () => {
  const mockPizzas = [
    {
      name: "Margherita",
      ingredients: ["Tomato", "Mozzarella", "Basil"],
      sizes: [
        { size: "Small", price: 8 },
        { size: "Medium", price: 10 },
        { size: "Large", price: 12 },
      ],
    },
  ];

  getPizzas.mockResolvedValue({ data: mockPizzas });
  render(<HomePage />);
  await waitFor(() => {
    expect(screen.getByText("Margherita")).toBeInTheDocument();
  });
});

test("adds pizza to cart", async () => {
  const mockPizzas = [
    {
      name: "Margherita",
      ingredients: ["Tomato", "Mozzarella", "Basil"],
      sizes: [
        { size: "Small", price: 8 },
        { size: "Medium", price: 10 },
        { size: "Large", price: 12 },
      ],
    },
  ];
  getPizzas.mockResolvedValue({ data: mockPizzas });

  const addToCart = jest.fn();
  useCart.mockImplementation(() => ({
    addToCart,
  }));

  render(<HomePage />);

  const addButtons = await screen.findAllByTestId("add-to-cart-button");
  userEvent.click(addButtons[1]);

  await waitFor(() => {
    expect(addToCart).toHaveBeenCalledWith({
      name: "Margherita",
      ingredients: ["Tomato", "Mozzarella", "Basil"],
      size: "Medium",
      price: 10,
      image: "default.webp",
    });
  });
});
