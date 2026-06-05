import React, { useState } from "react";
import { Link } from "react-router-dom";

export const TopBar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ name: "English", flag: "/assets/imgs/template/en.svg" });
  const [selectedCurr, setSelectedCurr] = useState("USD");

  const languages = [
    { name: "English", flag: "/assets/imgs/template/flag-en.svg" },
    { name: "Français", flag: "/assets/imgs/template/flag-fr.svg" },
    { name: "Español", flag: "/assets/imgs/template/flag-es.svg" },
    { name: "Português", flag: "/assets/imgs/template/flag-pt.svg" },
    { name: "中国人", flag: "/assets/imgs/template/flag-cn.svg" }
  ];
  const currencies = ["USD", "EUR", "AUD", "SGP"];

  return (
    <div className="topbar">
      <div className="container-topbar">
        <div className="menu-topbar-left d-none d-xl-block">
          <ul className="nav-small">
            <li>
              <Link className="font-xs" to="/about">About Us</Link>
            </li>
            <li>
              <Link className="font-xs" to="/careers">Careers</Link>
            </li>
            <li>
              <Link className="font-xs" to="/register">Create Account</Link>
            </li>
          </ul>
        </div>
        <div className="info-topbar text-center d-none d-xl-block">
          <span className="font-xs color-brand-3">Free shipping for all orders over</span>
          <span className="font-sm-bold color-success"> Rs. 10,000</span>
        </div>
        <div className="menu-topbar-right">
          <span className="font-xs color-brand-3">Need help? Call Us:</span>
          <span className="font-sm-bold color-success"> + 1800 900</span>
          <span className="font-xs color-brand-3 ml-15 mr-10">|</span>
          <Link className="font-xs color-brand-3 hover-up mr-10" to="/account?tab=order-tracking">Track Order</Link>
          <span className="font-xs color-brand-3 mr-10">|</span>
          <Link className="font-xs color-brand-3 hover-up" to="/contact">Support</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
