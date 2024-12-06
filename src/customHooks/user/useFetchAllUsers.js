import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig'

function useFetchAllUsers() {
    const token=localStorage.getItem('adminToken')
    const [allUsers,setAllUsers]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/user", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              setAllUsers(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    allUsers
  )
}

export default useFetchAllUsers