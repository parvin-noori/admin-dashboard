import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, { loginAction } from "./features/identity/components/login";
import Register, {
  registerAction,
} from "./features/identity/components/register";
import MainLayout from "./layouts/main-layout";
import Courses from "./pages/courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[{
      element:<Courses/>,
      index:true,
    }]
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
        action: loginAction,
        errorElement: <Login />,
      },
      {
        element: <Register />,
        path: "/register",
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);

export default router;
