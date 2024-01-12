import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import Footer from "./footer";

export default function MainLayout() {
  const [collapseSidebar, setCollapseSidebar] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="wrapper " style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="main">
        <TopNav />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
