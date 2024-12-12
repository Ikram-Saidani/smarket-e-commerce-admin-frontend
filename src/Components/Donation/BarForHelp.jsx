import { Button } from "@mui/material";
import React from "react";

function BarForHelp({ setSelected }) {
    const buttonsContent = [
        "all products",
        "add one"
      ];
  return (
    <>
      {buttonsContent.map((item, index) => (
        <Button
          key={index}
          onClick={() => {
            setSelected(item);
          }}
        >
          {item}
        </Button>
      ))}
    </>
  )
}

export default BarForHelp