import React, { useState } from "react";
import ProdNavBar from "../Components/Products/ProdNavBar";
import "../styles/products.css";
import AllProducts from "../Components/Products/AllProducts";
import AddProduct from "../Components/Products/AddProduct";
import LowStock from "../Components/Products/LowStock";
function Products() {
  const [getProducts, setGetProducts] = useState(true);
  const [addProducts, setAddProducts] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  return (
    <div className="mainPage productsPage">
      <ProdNavBar
        setGetProducts={setGetProducts}
        setAddProducts={setAddProducts}
        setLowStock={setLowStock}
      />
      {lowStock && <LowStock />}
      {getProducts && <AllProducts />}
      {addProducts && <AddProduct />}
    </div>
  );
}

export default Products;
