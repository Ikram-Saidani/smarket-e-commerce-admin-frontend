import React from "react";
import { baseURL } from "../../utils/config";
import { Button } from "@mui/material";
import appAxios from "../../utils/axiosConfig";
import UpdateDonateProd from "./UpdateDonateProd";
import { toast } from "react-toastify";

function DonatedProductBox({ product, products, setProducts }) {
  const token = localStorage.getItem("adminToken");
  
  const handleDeleteProd = () => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      appAxios
    .delete(`/api/helpAndHope/delete/${product._id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      toast.success("Product deleted successfully.");
      const newProducts = products.filter(
        (prod) => prod._id !== product._id
      );
      setProducts(newProducts);
    })
    .catch((err) => {
      console.log(err);
    });
  }else{
    toast.info("Product not deleted.");
  }
  };
  return (
    <div className="userBox">
      <div className="info">
        <img src={`${baseURL}/${product.image}`} alt="user_image" />
        <div>
          <p><strong>Title : </strong>{product.title}</p>
          <p><strong>Theme : </strong>{product.theme}</p>
          <p><strong>Coins : </strong>{product.coins}</p>
        </div>
      </div>
      <div className="buttonForUserBox">
        <UpdateDonateProd product={product} products={products} setProducts={setProducts} />
        <Button onClick={() => handleDeleteProd()}>Delete</Button>
      </div>
    </div>
  );
}

export default DonatedProductBox;
