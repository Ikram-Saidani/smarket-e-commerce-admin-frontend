import { Button } from "@mui/material";
import React, { useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import OrderDetails from "./OrderDetails";

function OrderBox({ order, orders, setOrders }) {
  const token = localStorage.getItem("adminToken");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdateStatus = (e) => {
    e.preventDefault();
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
          toast.success(`This order is ${selectedStatus}`);
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
      <div className="info orderInfo">
        <div>
          <p>
            <strong>User Name : </strong>
            {order.userId?.name}
          </p>
          <p>
            <strong>User Phone : </strong>
            {order.userId?.phone}
          </p>
          <p>
            <strong>User Address : </strong>
            {order.address}
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
            <strong>Date of order : </strong>
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p></p>
        </div>
      </div>
      <form
        onSubmit={(e) => handleUpdateStatus(e)}
        className="buttonForOrderBox"
      >
        <OrderDetails order={order} />
        <Button
          type="submit"
          className="done"
          onClick={() => {
            setSelectedStatus("done");
          }}
        >
          Done
        </Button>

        <Button
          type="submit"
          className="cancel"
          onClick={() => {
            setSelectedStatus("cancelled");
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default OrderBox;
