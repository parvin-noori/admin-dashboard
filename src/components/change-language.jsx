import React, { useEffect, useRef, useState } from "react";
import usFlag from "@assets/images/us.png";
import faFlag from "@assets/images/fa.png";
import { useAppContext } from "../contexts/app/app-context";

export default function ChangeLanguage() {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickOutside);

    return () => {
      document.addEventListener("mousedown", checkIfClickOutside);
    };
  }, [show]);

  const { language, changeLanguage } = useAppContext();

  useEffect(() => {
    setShow(false);
  }, [language]);

  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
        <img
          src={language === "fa" ? faFlag : usFlag}
          alt={language === "fa" ? "فارسی" : "english"}
        />
      </a>
      <div
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${
          show ? "show" : undefined
        }`}
      >
        <a
          className="dropdown-item"
          style={{ textAlign: language === "fa" ? "right" : "left" }}
          onClick={() => changeLanguage("fa")}
        >
          <img src={faFlag} alt="" width={20} className="ms-2" />
          <span className="align-middle"> فارسی</span>
        </a>
        <a
          className="dropdown-item"
          style={{ textAlign: language === "fa" ? "right" : "left" }}
          onClick={() => changeLanguage("en")}
        >
          <img src={usFlag} alt="" width={20} className="ms-2" />
          <span className="align-middle"> english</span>
        </a>
      </div>
    </div>
  );
}
