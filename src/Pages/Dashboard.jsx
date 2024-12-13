import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useFetchAllUsers from "../customHooks/user/useFetchAllUsers";
import useFetchUsersWithUserRole from "../customHooks/user/useFetchUsersWithUserRole";
import useFetchCoordinators from "../customHooks/user/useFetchCoordinators";
import useFetchAmbassadors from "../customHooks/user/useFetchAmbassadors";
import useFetchGroups from "../customHooks/user/useFetchGroups";
import useFetchProducts from "../customHooks/product/useFetchProducts";
import useFetchDonations from "../customHooks/donation/useFetchDonations";
import useFetchOrders from "../customHooks/order/useFetchOrders";
import appAxios from "../utils/axiosConfig";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

function Dashboard() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const totalUsers = useFetchAllUsers();
  const usersNumber = useFetchUsersWithUserRole();
  const coordinators = useFetchCoordinators();
  const ambassadors = useFetchAmbassadors();
  const groups = useFetchGroups();
  const products = useFetchProducts();
  const donations = useFetchDonations();
  const orders = useFetchOrders();
  const [totalSales, setTotalSales] = useState(0);
  const [groupSales, setGroupSales] = useState([]);

  const topGroupSales = groupSales
  .sort((a, b) => b.totalSales - a.totalSales)
  .slice(0, 5);

  const maxSales = Math.max(...topGroupSales.map((group) => group.totalSales));
  const barChartProps = {
    series: [
      {
        data: topGroupSales?.map((group) => group.totalSales),
        id: "sync",
        highlightScope: { highlight: "item", fade: "global" },
      },
    ],
    xAxis: [
      {
        scaleType: "band",
        data: topGroupSales.map((group) => group.groupId),
        label: "Groups",
      },
    ],
    yAxis: [
      {
        scaleType: "linear",
        min: 0,
        max: maxSales,
      },
    ],
    height: 400,
    width: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const pieChartProps = {
    series: [
      {
        id: "sync",
        data: topGroupSales.map((group) => ({
          value: group.totalSales,
          label: group.groupName || group.groupId,
          id: group.groupId,
        })),
        highlightScope: { highlight: "item", fade: "global" },
      },
    ],
    height: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  useEffect(() => {
    const isSameMonth = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
};
    let total = 0;
    orders?.forEach((order) => {
   if(
    isSameMonth(order.createdAt, new Date())
   ){
      total += order.paymentTotal;
    }else{
      total += 0;
    }
    });
    setTotalSales(total);

    if (groups?.length) {
      appAxios
        .get(`api/group/totalsales`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setGroupSales(res.data.data.totalSalesData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [orders, groups, token]);

  
  const [highlightedItem, setHighLightedItem] = useState(null);
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }
  , [token, navigate]);
  
  return (
    <div className="mainPage">
      <div className="boxesCount">
        <Link to={"/admin/users"}>
          <div className="boxGeneral boxAllUsers">
            <h2>All Users</h2>
            <p>{totalUsers?.length}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div className="boxGeneral boxUsers">
            <h2>Users</h2>
            <p>{usersNumber?.length}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div className="boxGeneral boxCoordinators">
            <h2>Coordinators</h2>
            <p>{coordinators?.length}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div className="boxGeneral boxAmbassadors">
            <h2>Ambassadors</h2>
            <p>{ambassadors?.length}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div className="boxGeneral boxGroups">
            <h2>Groups</h2>
            <p>{groups?.length}</p>
            <span>
              <FaUser />
            </span>
          </div>
        </Link>
        <Link to={"/admin/products"}>
          <div className="boxGeneral boxProducts">
            <h2>Products</h2>
            <p>{products?.length}</p>
            <span>
              <FaProductHunt />
            </span>
          </div>
        </Link>
        <Link to={"/admin/donation"}>
          <div className="boxGeneral boxDonation">
            <h2>Donation</h2>
            <p>{donations?.length}</p>
            <span>
              <BiSolidDonateHeart />
            </span>
          </div>
        </Link>
        <Link to={"/admin/orders"}>
          <div className="boxGeneral boxSales">
            <h2>Total Sales</h2>
            <p>{totalSales.toFixed(2)} TND</p>
            <span>
              <FaCartShopping />
            </span>
          </div>
        </Link>
      </div>
      <div className="diagram">
        <h3>Top 5 Group Sales</h3>
        <Stack
          className="chart"
          direction={{ xs: "column", xl: "row" }}
          spacing={1}
          sx={{ width: "100%" }}
        >
          <BarChart
            {...barChartProps}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
          />
          <PieChart
            className="pieChart"
            {...pieChartProps}
            highlightedItem={highlightedItem}
            onHighlightChange={setHighLightedItem}
          />
        </Stack>
      </div>
    </div>
  );
}

export default Dashboard;
