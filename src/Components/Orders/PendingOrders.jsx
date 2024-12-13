import React, { useEffect, useState } from "react";
import OrderBox from "./OrderBox";
import appAxios from "../../utils/axiosConfig";

function PendingOrders() {
  const token = localStorage.getItem("adminToken");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    appAxios
      .get("/api/order/status/pending", {
        headers: 
          {Authorization: token},
       
      })
      .then((res) => {
         setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setOrders,token]);
  return (
    <div className="allUsers">
      <h3 className="userPageTitle">Pending Orders</h3>

      <div className="usersBoxes">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <OrderBox
              order={order}
              key={order._id}
              orders={orders}
              setOrders={setOrders}
            />
          ))
        ) : (
          <p>No order available.</p>
        )}
      </div>
    </div>
  );
}

export default PendingOrders;
