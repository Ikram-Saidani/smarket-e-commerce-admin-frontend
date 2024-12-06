import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchDonations() {
    const token = localStorage.getItem("adminToken");
    const [donations,setDonations]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/donationHistory", {
                headers: {
                    Authorization: token,
                },
             
            })
            .then((res) => {
                setDonations(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    donations
  )
}

export default useFetchDonations