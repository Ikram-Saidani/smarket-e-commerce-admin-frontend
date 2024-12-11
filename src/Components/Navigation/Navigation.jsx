import React, { useState } from "react";
import "../../styles/navigation.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHome } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { TbBrandProducthunt, TbShoppingCart } from "react-icons/tb";
import { BiDonateHeart } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully!");
    navigate("/admin/login");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isLogin = location.pathname === "/admin/login";
  return (
    <>
      {!isLogin && (
        <Button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </Button>
      )}
      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        {!isLogin && (
          <div className="navigation">
            <ul>
              <li onClick={toggleMenu}>
                <Link to="/admin">
                  <RxHome />
                  Home
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <Link to="/admin/products">
                  <TbBrandProducthunt />
                  Products
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <Link to="/admin/users">
                  <FaRegUser />
                  Users
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <Link to="/admin/orders">
                  <TbShoppingCart />
                  Orders
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <Link to="/admin/donation">
                  <BiDonateHeart />
                  Donation
                </Link>
              </li>
              <li onClick={toggleMenu}>
                <Link onClick={(e) => handleLogout(e)} to="/admin/login">
                  <TbLogout2 />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navigation;
