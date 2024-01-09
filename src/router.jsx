import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login from "./features/identity/components/login";
import Register from "./features/identity/components/register";

const router = createBrowserRouter([
  {
    element: <IdentityLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Register />,
        path: "/register",
      },
    ],
  },
]);

export default router;
