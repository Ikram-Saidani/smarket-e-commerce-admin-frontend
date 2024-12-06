import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchCoordinators() {
    const token=localStorage.getItem('adminToken')
    const [coordinators,setCoordinators]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/user/coordinators", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
                setCoordinators(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    coordinators
  )
}

export default useFetchCoordinators