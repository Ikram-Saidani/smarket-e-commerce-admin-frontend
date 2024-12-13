import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import appAxios from "../../utils/axiosConfig";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderDetails({ order }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    appAxios
      .get(`/api/order/${order._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [order._id, token]);

  // Print Function
  const handlePrint = () => {
    const printContent = document.getElementById("printableOrderDetails");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            h4 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <Button className="details" onClick={() => setIsOpenModal(true)}>
        Details
      </Button>
      <Dialog
        maxWidth="lg"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        TransitionComponent={Transition}
        className="detailsModal"
      >
        <Button className="close" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>

        <div className="productPage container-fluid" id="printableOrderDetails">
          <h4>Order Details</h4>

          <div className="productInfo">
            <p>
              <strong>User Name: </strong>
              {order.userId?.name}
            </p>
            <p>
              <strong>User Phone: </strong>
              {order.userId?.phone}
            </p>
            <p>
              <strong>User Address: </strong>
              {order.address}
            </p>
            <p>
              <strong>Total: </strong>
              {order.paymentTotal.toFixed(2)} TND
            </p>
            <p>
              <strong>Payment Mode: </strong>
              {order.paymentMode}
            </p>
            <p>
              <strong>Date of Order: </strong>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Ordered Products:</strong>
            </p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Selected Size</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderedProducts?.map((product) => (
                  <tr key={product.productId._id}>
                    <td>{product.productId?.title || "Product Title Not Found"}</td>
                    <td>{product.quantity}</td>
                    <td>{product.selectedSize || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button className="orderButtonDetail" onClick={handlePrint}>
            Print Order
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default OrderDetails;
