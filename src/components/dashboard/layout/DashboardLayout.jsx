import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { DashSidebar } from "./DashSidebar";
import { DashHeader } from "./DashHeader";
import { useAuth } from "../../../hooks/useAuth";

export const DashboardLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Inject original dashboard CSS
  useEffect(() => {
    const existingLink = document.getElementById("dash-style");
    if (!existingLink) {
      const link = document.createElement("link");
      link.id = "dash-style";
      link.rel = "stylesheet";
      link.href = "/dash-assets/css/style.css";
      document.head.appendChild(link);
    }
    document.body.classList.add("dash-layout");

    return () => {
      const link = document.getElementById("dash-style");
      if (link) link.remove();
      document.body.classList.remove("dash-layout");
    };
  }, []);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Screen overlay for mobile */}
      <div className="screen-overlay" onClick={() => setSidebarOpen(false)} />

      {/* Original sidebar — fixed position (from template CSS) */}
      <DashSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content — fills remaining width next to sidebar */}
      <main
        className="main-wrap"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "calc(100% - 260px)",
        }}
      >
        <DashHeader setSidebarOpen={setSidebarOpen} />
        <section className="content-main" style={{ flex: 1 }}>
          <Outlet />
        </section>
        <footer className="main-footer font-xs">
          <div className="row pb-30 pt-15">
            <div className="col-sm-6">
              {new Date().getFullYear()} &copy;, BUXAA Admin Panel.
            </div>
            <div className="col-sm-6">
              <div className="text-sm-end">All rights reserved</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};
export default DashboardLayout;
