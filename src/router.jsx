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
import { CategoryProvider } from "./features/categories/category-context";
import UnhandledException from "./pages/unhandled-exception";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesList,
      },
      {
        path: "/course-categories",
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
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
  { path: "*", element: <NotFound /> },
]);

export default router;
