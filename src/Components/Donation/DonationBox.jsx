import { Button } from '@mui/material'
import React from 'react'
import appAxios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

function DonationBox({ donation, donations, setDonations }) {
  const token=localStorage.getItem("adminToken");
  const handleUpdateDonationStatus = () => {
    appAxios
      .put(`/api/donationHistory/${donation._id}`, {}, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success("Donation status updated successfully.");
        setDonations(
          donations.map((don) =>
            don._id === donation._id ? { ...don, status: true } : don
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Donation status not updated.");
      });
    }
    return (
    <div className="userBox">
    <div className="info">
     
      <div>
      <p><strong>User Name : </strong>{donation.userId?.name}</p>
        <p><strong>Title : </strong>{donation.productDonated?.title}</p>
        <p><strong>Theme : </strong>{donation.productDonated?.theme}</p>
        <p><strong>Coins : </strong>{donation.productDonated?.coins}</p>
       {donation.status===false && <p
       style={{color:"red"}}
       ><strong>Status : </strong>Not Completed</p>}
         {donation.status===true && <p
         style={{color:"green"}}
         ><strong>Status : </strong>Completed</p>}
   
      </div>
    </div>
    <div className="buttonForUserBox">
      <Button onClick={() => handleUpdateDonationStatus()}>Completed ?</Button>
    </div>
  </div>
  )
}

export default DonationBox