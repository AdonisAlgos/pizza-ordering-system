import "./App.css";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  BasketPage,
  ErrorPage,
  LayoutPage,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./contexts/Basket.context";
import { UserProvider } from "./contexts/User.context";

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
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
