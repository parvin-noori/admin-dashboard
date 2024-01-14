import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, { loginAction } from "./features/identity/components/login";
import Register, {
  registerAction,
} from "./features/identity/components/register";
import MainLayout from "./layouts/main-layout/main-layout";
import Courses, { coursesList } from "./pages/courses";
import CourseCategories, { categoriesLoader } from "./pages/course-categories";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/components/course-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesList,
      },
      {
        path: "/course-categories",
        element: <CourseCategories />,
        loader: categoriesLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      }
    ],
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
