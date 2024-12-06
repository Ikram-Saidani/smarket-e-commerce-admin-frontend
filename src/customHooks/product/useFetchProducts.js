import { useEffect, useState } from 'react'
import appAxios from '../../utils/axiosConfig';

function useFetchProducts() {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        appAxios
            .get("/api/product")
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[])
  return (
    products
  )
}

export default useFetchProducts