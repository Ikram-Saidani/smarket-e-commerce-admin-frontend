import React, { useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import CategoryBar from "./CategoryBar";

function AllProducts() {
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
  }, [category]);
  return (
    <div className="allProducts">
      <div className="categoryBar">
        <CategoryBar setCategory={setCategory} />
      </div>
        <h3>{category}</h3>
      <div className="productsBoxes">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductBox item={product} key={product._id} products={products} setProducts={setProducts}/>
          ))
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
