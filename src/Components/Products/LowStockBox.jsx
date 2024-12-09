import React from "react";
import UpdateProduct from "./UpdateProduct";
import { Button } from "@mui/material";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function LowStockBox({ item, products, setProducts }) {
  const token = localStorage.getItem("adminToken");
  const handleDeleteProduct = async () => {
    appAxios
      .delete(`/api/product/delete/${item._id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        toast.success("Product deleted successfully.");
        const newProducts = products.filter(
          (product) => product._id !== item._id
        );
        setProducts(newProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="productBox">
      <div className="info">
        <img src={item.image} alt="product_image" />
        <div>
          <h3>
            {item.title.length > 20
              ? item.title.slice(0, 20) + "..."
              : item.title}
          </h3>
          <p>Price: {item.price.toFixed(2)} $</p>
          <p>Count in Stock: {item.countInStock}</p>
        </div>
      </div>
      <div className="buttons">
        <UpdateProduct item={item} />
        <Button onClick={handleDeleteProduct}>Delete</Button>
      </div>
    </div>
  );
}

export default LowStockBox;
