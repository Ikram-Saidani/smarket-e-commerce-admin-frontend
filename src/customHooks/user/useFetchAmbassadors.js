import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchAmbassadors() {
    const token=localStorage.getItem('adminToken')
    const [ambassadors,setAmbassadors]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/user/ambassadors", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
                setAmbassadors(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    ambassadors
  )
}

export default useFetchAmbassadors