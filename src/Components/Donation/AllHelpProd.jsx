import React, { useEffect, useState } from 'react'
import BarForHelp from './BarForHelp';
import DonatedProductBox from './DonatedProductBox';
import AddHelpProd from './AddHelpProd';
import appAxios from '../../utils/axiosConfig';

function AllHelpProd() {
  const [selected, setSelected] = useState("all products");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    appAxios.get("/api/helpAndHope")
    .then((res) => {
      setProducts(res.data.data);
    }
    )
    .catch((err) => {
      console.log(err);
    });
  },[setProducts]);
  return (
    <div className='allUsers'>
      <div className="usersBar">
        <BarForHelp setSelected={setSelected}/>
      </div>
      <h3 className="userPageTitle">{selected}</h3>
      {selected === "all products" && (
        <div className="usersBoxes">
          {products?.length > 0 ? (
            products.map((product) => (
              <DonatedProductBox
              product={product}
              key={product._id}
              products={products}
              setProducts={setProducts}
              />
            ))
            ):(
              <p>No product available.</p>
            )}
        </div>
      )}
      {selected === "add one" && (
        <div className="mainHelpPage">
         <AddHelpProd 
          products={products}
          setProducts={setProducts}
         />
        </div>
      )}
    </div>
  )
}

export default AllHelpProd