import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const DashHeader = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="main-header navbar">
      {/* Search */}
      <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search term"
            />
            <button className="btn btn-light bg" type="button">
              <i className="material-icons md-search"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Right nav */}
      <div className="col-nav">
        {/* Mobile menu toggle */}
        <button
          className="btn btn-icon btn-mobile me-auto"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <i className="material-icons md-apps"></i>
        </button>

        <ul className="nav">
          {/* Notifications bell */}
          <li className="nav-item">
            <a className="nav-link btn-icon" href="#">
              <i className="material-icons md-notifications animation-shake"></i>
              <span className="badge rounded-pill">3</span>
            </a>
          </li>

          {/* Dark mode */}
          <li className="nav-item">
            <a className="nav-link btn-icon darkmode" href="#">
              <i className="material-icons md-nights_stay"></i>
            </a>
          </li>

          {/* Fullscreen */}
          <li className="nav-item">
            <a
              className="requestfullscreen nav-link btn-icon"
              href="#"
              onClick={(e) => { e.preventDefault(); toggleFullScreen(); }}
            >
              <i className="material-icons md-cast"></i>
            </a>
          </li>

          {/* Language */}
          <li className="dropdown nav-item">
            <a
              className="dropdown-toggle"
              href="#"
              onClick={(e) => { e.preventDefault(); setLangOpen(!langOpen); setProfileOpen(false); }}
            >
              <i className="material-icons md-public"></i>
            </a>
            {langOpen && (
              <div className="dropdown-menu dropdown-menu-end show" style={{ display: "block", position: "absolute", right: 0, zIndex: 1000 }}>
                <a className="dropdown-item text-brand" href="#" onClick={() => setLangOpen(false)}>
                  <img src="/dash-assets/imgs/theme/flag-us.png" alt="English" /> English
                </a>
                <a className="dropdown-item" href="#" onClick={() => setLangOpen(false)}>
                  <img src="/dash-assets/imgs/theme/flag-fr.png" alt="Français" /> Français
                </a>
                <a className="dropdown-item" href="#" onClick={() => setLangOpen(false)}>
                  <img src="/dash-assets/imgs/theme/flag-jp.png" alt="日本語" /> 日本語
                </a>
                <a className="dropdown-item" href="#" onClick={() => setLangOpen(false)}>
                  <img src="/dash-assets/imgs/theme/flag-cn.png" alt="中国人" /> 中国人
                </a>
              </div>
            )}
          </li>

          {/* User avatar dropdown */}
          <li className="dropdown nav-item">
            <a
              className="dropdown-toggle"
              href="#"
              onClick={(e) => { e.preventDefault(); setProfileOpen(!profileOpen); setLangOpen(false); }}
            >
              <img
                className="img-xs rounded-circle"
                src={user?.avatar || "/dash-assets/imgs/people/avatar2.jpg"}
                alt="User"
              />
            </a>
            {profileOpen && (
              <div className="dropdown-menu dropdown-menu-end show" style={{ display: "block", position: "absolute", right: 0, zIndex: 1000 }}>
                <Link
                  className="dropdown-item"
                  to="/dashboard/settings/v2"
                  onClick={() => setProfileOpen(false)}
                >
                  <i className="material-icons md-perm_identity"></i> Edit Profile
                </Link>
                <Link
                  className="dropdown-item"
                  to="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                >
                  <i className="material-icons md-settings"></i> Account Settings
                </Link>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-account_balance_wallet"></i> Wallet
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-receipt"></i> Billing
                </a>
                <a className="dropdown-item" href="#">
                  <i className="material-icons md-help_outline"></i> Help center
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item text-danger"
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLogout(); }}
                >
                  <i className="material-icons md-exit_to_app"></i> Logout
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};
export default DashHeader;
