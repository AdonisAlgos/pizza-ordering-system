import BasketPage from "./Basket.page";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders basket page", () => {
  render(<BasketPage />);
});
