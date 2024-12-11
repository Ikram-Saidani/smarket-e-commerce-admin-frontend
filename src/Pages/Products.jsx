import React, { useEffect, useState } from "react";
import ProdNavBar from "../Components/Products/ProdNavBar";
import "../styles/products.css";
import AllProducts from "../Components/Products/AllProducts";
import AddProduct from "../Components/Products/AddProduct";
import LowStock from "../Components/Products/LowStock";
import { useNavigate } from "react-router-dom";
function Products() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [getProducts, setGetProducts] = useState(true);
  const [addProducts, setAddProducts] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }
  , [token, navigate]);
  return (
    <div className="mainPage productsPage">
      <ProdNavBar
        setGetProducts={setGetProducts}
        setAddProducts={setAddProducts}
        setLowStock={setLowStock}
      />
      {getProducts && <AllProducts />}
      {lowStock && <LowStock />}
      {addProducts && <AddProduct />}
    </div>
  );
}

export default Products;
