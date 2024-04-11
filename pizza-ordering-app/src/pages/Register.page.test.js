import RegisterPage from "./Register.page";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders register page", () => {
  render(<RegisterPage />);
});
