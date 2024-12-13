import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import OrderNavbar from '../Components/Orders/OrderNavbar';
import PendingOrders from '../Components/Orders/PendingOrders';
import TotalSales from '../Components/Orders/TotalSales';

function Orders() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [orders, setOrders] = useState(true);
  const [totalSales, setTotalSales] = useState(false);
  
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }
  , [token, navigate]);
  return (
    <div className="mainPage productsPage">
    <OrderNavbar
      setOrders={setOrders}
      setTotalSales={setTotalSales}
    />
    {orders && <PendingOrders />}
    {totalSales && <TotalSales />}
  </div>
  )
}

export default Orders