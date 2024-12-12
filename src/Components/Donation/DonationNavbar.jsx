import { Button } from '@mui/material';
import React from 'react'

function DonationNavbar({ setGetProducts, setDonationHistories }) {
  return (
    <div className="navBar">
      <Button
        onClick={() => {
          setGetProducts(true);
            setDonationHistories(false);
        }}
      >
        Products For Help
      </Button>
      <Button
        onClick={() => {
          setGetProducts(false);
            setDonationHistories(true);
        }}
      >
       Donation
      </Button>
    </div>
  )
}

export default DonationNavbar