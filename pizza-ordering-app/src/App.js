import "./App.css";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  BasketPage,
  ErrorPage,
  UserPage,
  LayoutPage,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./contexts/Basket.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "basket",
        element: <BasketPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
