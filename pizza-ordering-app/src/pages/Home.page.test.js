import HomePage from "./Home.page";
import { render, screen, fireEvent } from "@testing-library/react";


test('renders Custom Order button', () => {
  render(<HomePage />);
  const buttonElement = screen.getByText(/Custom Order/i);
  expect(buttonElement).toBeInTheDocument();
});

test('displays Custom Order menu when Custom Order button is clicked', () => {
  render(<HomePage />);
  const buttonElement = screen.getByRole('button', { name: /Custom Order/i });
  fireEvent.click(buttonElement);
  const menuElement = screen.getByRole('heading', { name: /Custom Order/i });
  expect(menuElement).toBeInTheDocument();
});
 
test('initial state of radio buttons is unchecked', () => {
  render(<HomePage />);
  const radioButtons = screen.getAllByRole('radio');
  radioButtons.forEach((radioButton) => {
    expect(radioButton).not.toBeChecked();
  });
});

test('clicking on a radio button changes the selectedPizza state', () => {
  render(<HomePage />);
  const radioButton = screen.getByRole('radio', { name: /Peperoni Pizza/i });
  fireEvent.click(radioButton);
  expect(radioButton).toBeChecked();
});

test('clicking on the Order button without selecting a pizza displays an alert message', () => {
  render(<HomePage />);
  const buttons = screen.getAllByRole('button');
  const orderButton = buttons.find(button => button.textContent === 'Order');
  window.alert = jest.fn();
  fireEvent.click(orderButton);
  expect(window.alert).toHaveBeenCalledWith('Please select a pizza before ordering.');
});

test('clicking on the Finish Order button without selecting a topping displays an alert message', () => {
  render(<HomePage />);
  const customOrderButton = screen.getByRole('button', { name: /Custom Order/i });
  fireEvent.click(customOrderButton);
  const finishOrderButton = screen.getByRole('button', { name: /Finish Order/i });
  window.alert = jest.fn();
  fireEvent.click(finishOrderButton);
  console.log(window.alert.mock.calls);
  expect(window.alert).toHaveBeenCalledWith('Please select at least one topping before finishing your order.');
});

test('clicking on the Order button with a pizza selected displays an alert message and clears the selected pizza', () => {
  render(<HomePage />);
  const radioButton = screen.getByRole('radio', { name: /Peperoni Pizza/i });
  const buttons = screen.getAllByRole('button');
  const orderButton = buttons.find(button => button.textContent === 'Order');
  window.alert = jest.fn();
  fireEvent.click(radioButton);
  fireEvent.click(orderButton);
  expect(window.alert).toHaveBeenCalledWith('You selected: peperoni');
  expect(radioButton).not.toBeChecked();
});