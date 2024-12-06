import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchUsersWithUserRole() {
    const token=localStorage.getItem('adminToken')
    const [allUserswithuserRole,setAllUserswithuserRole]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/user/users", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
                setAllUserswithuserRole(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    allUserswithuserRole
  )
}

export default useFetchUsersWithUserRole