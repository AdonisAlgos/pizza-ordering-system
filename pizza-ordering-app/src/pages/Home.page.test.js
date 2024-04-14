import React from "react";
import HomePage from "./Home.page";
import userEvent from "@testing-library/user-event";
import {
  findByRole,
  render,
  screen,
  waitFor,
  waitForElement,
} from "@testing-library/react";
import { getPizzas } from "../apis/getPizzas";
import { useCart } from "../contexts/Basket.context";

jest.mock("../apis/getPizzas");
jest.mock("../contexts/Basket.context", () => ({
  useCart: jest.fn(),
}));
jest.mock("../components/Images", () => ({
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
  expect(
    screen.getByText(/Best Stone Oven Pizza in London/i)
  ).toBeInTheDocument();
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

// test("failure to fetch pizza data", async () => {
//   getPizzas.mockRejectedValue(new Error("Failed to fetch"));
//   render(<HomePage />);
//   await waitFor(() => {
//     expect(screen.getByText("Error retrieving pizzas")).toBeInTheDocument();
//   });
// });

test("adds pizza to cart", async () => {
  const mockPizzas = [
    {
      name: "Pepperoni",
      ingredients: ["Pepperoni", "Cheese", "Tomato Sauce"],
      sizes: [{ size: "Medium", price: 12 }],
      image: "default.webp",
    },
  ];
  getPizzas.mockResolvedValue({ data: mockPizzas });

  const addToCart = jest.fn();
  useCart.mockImplementation(() => ({
    addToCart,
  }));

  render(<HomePage />);
  const addButton = await screen.findByRole("button", { name: /add to cart/i });

userEvent.click(addButton);

  await waitFor(() => {
    expect(addToCart).toHaveBeenCalledWith(expect.anything()); // Replace with the actual expected object
  });
});
