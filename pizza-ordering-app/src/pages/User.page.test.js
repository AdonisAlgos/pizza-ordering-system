import UserPage from "./User.page";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders account page", () => {
  render(<UserPage />);
});
