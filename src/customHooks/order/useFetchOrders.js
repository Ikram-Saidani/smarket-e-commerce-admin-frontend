import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchOrders() {
    const token = localStorage.getItem("adminToken");
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/order", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                setOrders(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    orders
  )
}

export default useFetchOrders