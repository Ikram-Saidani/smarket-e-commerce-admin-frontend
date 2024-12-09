import { Button } from "@mui/material";
import React from "react";

function CategoryBar({ setCategory }) {
  const allCategories = [
    "fashion",
    "bags",
    "footwear",
    "jewellery",
    "beauty",
    "electronics",
    "groceries",
  ];
  return (
    <>
      {allCategories.map((item, index) => (
        <Button key={index} onClick={()=>setCategory(item)}>
          {item}
        </Button>
      ))}
    </>
  );
}

export default CategoryBar;
