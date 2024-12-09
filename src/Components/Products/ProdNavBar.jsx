import { Button } from "@mui/material";
import React from "react";

function ProdNavBar({ setGetProducts, setAddProducts, setLowStock }) {
  return (
    <div className="navBar">
      <Button
        onClick={() => {
          setGetProducts(false);
          setAddProducts(false);
          setLowStock(true);
        }}
      >
        Low Stock
      </Button>
      <Button
        onClick={() => {
          setGetProducts(true);
          setAddProducts(false);
          setLowStock(false);
        }}
      >
        All Products
      </Button>
      <Button
        onClick={() => {
          setGetProducts(false);
          setAddProducts(true);
          setLowStock(false);
        }}
      >
        Add One
      </Button>
    </div>
  );
}

export default ProdNavBar;
