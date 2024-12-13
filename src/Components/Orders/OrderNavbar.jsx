import { Button } from '@mui/material';
import React from 'react'

function OrderNavbar({setOrders, setTotalSales}) {
  return (
    <div className="navBar">
    <Button
      onClick={() => {
        setOrders(true);
        setTotalSales(false);
      }}
    >
      Pending Orders
    </Button>
    <Button
      onClick={() => {
        setOrders(false);
        setTotalSales(true);
      }}
    >
     Monthly Sales
    </Button>
  </div>
  )
}

export default OrderNavbar