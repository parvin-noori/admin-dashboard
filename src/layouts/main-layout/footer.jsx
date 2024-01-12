import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="mb-0">
              © 2023 -{" "}
              <a href="index.html" className="text-muted">
                {t("classbon")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
