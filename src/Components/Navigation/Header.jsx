import React from "react";
import logo from "../../assets/images/logo.png"

import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const isLogin =
    location.pathname === "/admin/login";
  return (
    <>
    {!isLogin && (
      <header>
      <h1>Admin Dashboard</h1>
      <img src={logo} alt="logo" />
    </header>
    )}
    </>
  );
}

export default Header;
