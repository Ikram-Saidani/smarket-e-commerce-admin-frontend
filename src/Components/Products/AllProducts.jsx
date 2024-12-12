import React from "react";
import ProductBox from "./ProductBox";
import CategoryBar from "./CategoryBar";

function AllProducts({ products, setProducts, category, setCategory }) {
 
  return (
    <div className="allProducts">
      <div className="categoryBar">
        <CategoryBar setCategory={setCategory} />
      </div>
      <h3>{category}</h3>
      <div className="productsBoxes">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductBox
              item={product}
              key={product._id}
              products={products}
              setProducts={setProducts}
            />
          ))
        ) : (
          <p>No products available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
