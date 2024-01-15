import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "../src/features/identity/components/login";
import Register from "../src/features/identity/components/register";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./core/i18next";
import { useAppContext } from "./contexts/app/app-context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { theme } = useAppContext();

  useEffect(() => {
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/css/${theme}.css`;
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer rtl />
    </>
  );
}

export default App;
