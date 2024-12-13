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
      .get(`/api/order/${order._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [order._id,token]);
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

        <div className="productPage container-fluid">
          <h4>Order Details</h4>

          <div className="productInfo">
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
              <p>
                <strong>Ordered products :</strong>
                <br />
                {orderDetails.orderedProducts?.map((product) => (
                  <div className="orderDetails" key={product._id}>
                    <p>Product : {product.productId?.title} </p>
                    <p>x</p>
                    {product.productId?.category==="fashion"&&(
                        <p> {product.selectedSize?.quantity}</p>
                    )}
                    {product.productId?.category==="footwear"&&(
                        <p> {product.selectedSize?.quantity}</p>
                    )}
                   {(product.productId?.category!=="footwear"&&product.productId?.category!=="fashion")&&(
                    <p>{product.quantity}</p>
                   )} 
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default OrderDetails;
