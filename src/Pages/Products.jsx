import React, { useEffect, useState } from "react";
import ProdNavBar from "../Components/Products/ProdNavBar";
import "../styles/products.css";
import AllProducts from "../Components/Products/AllProducts";
import AddProduct from "../Components/Products/AddProduct";
import LowStock from "../Components/Products/LowStock";
import { useNavigate } from "react-router-dom";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";
function Products() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [getProducts, setGetProducts] = useState(true);
  const [addProducts, setAddProducts] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  const [category, setCategory] = useState("fashion");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const ratingFilter = 0;
    const priceRange = [0, Infinity];
    appAxios
      .get(
        `/api/product/category?category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&minRating=${ratingFilter}`
      )
      .then((response) => {
        const data = response.data.data.data;
        setProducts(data);
        if (response.data.data.totalCount === 0) {
          toast.warning("No products available in this category.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        toast.warning("No product exist with this filter search.");
      });
  }, [category,setProducts]);
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
      {getProducts && <AllProducts
        products={products}
        setProducts={setProducts}
        category={category}
        setCategory={setCategory}
       />}
      {lowStock && <LowStock />}
      {addProducts && <AddProduct
        products={products}
        setProducts={setProducts}
      />}
    </div>
  );
}

export default Products;
