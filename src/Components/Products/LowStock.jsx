import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import LowStockBox from "./LowStockBox";

function LowStock() {
    const token = localStorage.getItem("adminToken");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    appAxios
      .get("api/product/allproducts/countinstock",
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <div className="lowStock">
      <h3>Low Stock</h3>
      <div className="productsBoxes">
        {products.length > 0 ? (
          products.map((product) => (
            <LowStockBox item={product} key={product._id} products={products} setProducts={setProducts}/>
          ))
        ) : (
          <p>No products in low stock.</p>
        )}
      </div>
    </div>
  );
}

export default LowStock;
