import "./App.css";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
