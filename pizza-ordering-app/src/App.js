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
  return <RouterProvider router={router} />;
}

export default App;
