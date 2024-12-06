import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchGroups() {
    const token=localStorage.getItem('adminToken')
    const [groups,setGroups]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/group", {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
                setGroups(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[token])
  return (
    groups
  )
}

export default useFetchGroups