import { Button } from "@mui/material";
import React from "react";

function BarForUsers({ setSelected }) {
  const buttonsContent = [
    "all",
    "coordinators",
    "ambassadors",
    "users",
    "no order",
    "birth month",
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
  );
}

export default BarForUsers;
