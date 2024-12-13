import { Button } from "@mui/material";
import React, { useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function OrderBox({ order, orders, setOrders }) {
  const token = localStorage.getItem("adminToken");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdateStatus = () => {
    if (window.confirm(`Are you sure that this order is ${selectedStatus}?`)) {
      appAxios
        .put(
          `/api/order/updateorder/${order._id}`,
          { status: selectedStatus },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.info(`This order is ${selectedStatus}`);
          const newOrders = orders.filter((ord) => ord._id !== order._id);
          setOrders(newOrders);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update order status.");
        });
    }
  };
  return (
    <div className="userBox">
      <div className="info">
        <div>
          <p>
            <strong>User Name : </strong>{order.userId?.name}
          </p>
          <p>
            <strong>User Phone : </strong>{order.userId?.phone}
          </p>
          <p>
            <strong>User Address : </strong>{order.address}
          </p>
          <p>
            <strong>Total : </strong>
            {order.paymentTotal.toFixed(2)}
          </p>
          <p>
            <strong>Payment Mode : </strong>
            {order.paymentMode}
          </p>
          <p>
            <strong>Date of order : {new Date(order.createdAt).toLocaleDateString()}</strong>
          </p>
          <p>
          </p>
         
        </div>
      </div>
      <div className="buttonForUserBox">
        <Button
          onClick={() => {
            setSelectedStatus("done");
            handleUpdateStatus();
          }}
        >
          Done?
        </Button>

        <Button
          onClick={() => {
            setSelectedStatus("Cancelled");
            handleUpdateStatus();
          }}
        >
          Cancelled?
        </Button>
      </div>
    </div>
  );
}

export default OrderBox;
