import React, {  useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddForm from "./AddForm";

function AddProduct({products, setProducts }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const category = [
    "fashion",
    "bags",
    "footwear", 
    "jewellery",
    "beauty",
    "electronics",
    "groceries",
  ];

  return (
    <div className="addProduct">
      <h2>Add New Product</h2>
      <FormControl className="categoryForm">
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper gender"
          name="category"
          value={selectedCategory}
          label="category"
          onChange={(e)=>setSelectedCategory(e.target.value)}
        >
          {category.map((item,i) => {
            return <MenuItem key={i} className="menuCategory" value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>

      {selectedCategory&&(<AddForm
        setProducts={setProducts}
        products={products}
        selectedCategory={selectedCategory}
      />)}
    </div>
  );
}

export default AddProduct;
