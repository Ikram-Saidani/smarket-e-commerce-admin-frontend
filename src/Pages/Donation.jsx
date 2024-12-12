import React, { useEffect, useState } from "react";
import "../styles/donation.css";
import { useNavigate } from "react-router-dom";
import DonationNavbar from "../Components/Donation/DonationNavbar";
import AllHelpProd from "../Components/Donation/AllHelpProd";
import DonationHistories from "../Components/Donation/DonationHistories";

function Donation() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [getProducts, setGetProducts] = useState(true);
  const [donationHistories, setDonationHistories] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }
  , [token, navigate]);
  return (
    <div className="mainPage productsPage">
      <DonationNavbar
        setGetProducts={setGetProducts}
        setDonationHistories={setDonationHistories}
      />
      {getProducts && <AllHelpProd />}
      {donationHistories && <DonationHistories />}
    </div>
  )
}

export default Donation