import React from "react";
import HomePage from "./Home.page";
import { render, screen } from "@testing-library/react";
import { getPizzas } from "../apis/getPizzas";

// Mock the module that exports getPizzas
jest.mock("../apis/getPizzas");

test("renders home page and checks for pizza data", async () => {
  // Mock implementation of getPizzas
  const mockPizzas = [
    {
      name: "Margherita",
      ingredients: ["tomato", "mozzarella", "basil"],
      sizes: [{ price: "$8" }, { price: "$10" }, { price: "$12" }],
    },
    // Add more mock pizza data as needed
  ];
  getPizzas.mockResolvedValue({ data: mockPizzas });

  render(<HomePage />);

  // Check if the first pizza's name is displayed
  expect(await screen.findByText(mockPizzas[0].name)).toBeInTheDocument();
  // Add more assertions as needed based on your mock data and UI structure
});
