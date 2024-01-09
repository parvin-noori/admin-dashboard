import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "../src/features/identity/components/login";
import Register from "../src/features/identity/components/register"
import { RouterProvider } from "react-router-dom";
import router from './router'

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
