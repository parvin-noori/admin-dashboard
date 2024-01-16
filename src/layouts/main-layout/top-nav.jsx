import React from "react";
import ChangeLanguage from "../../components/change-language";
import ChangeTheme from "../../components/change-theme";
import { useAppContext } from "../../contexts/app/app-context";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();
  const { language } = useAppContext();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { toggleSidebar } = useAppContext();
  return (
    <nav className="navbar">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-2 me-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
        <button
          className="btn ms-2 btn-outline-danger fw-bold"
          onClick={logOut}
        >
          خارج شوید
        </button>
      </div>
    </nav>
  );
}
