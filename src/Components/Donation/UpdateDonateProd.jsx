import React, { useState } from 'react'
import { Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";

import { Dialog } from "@mui/material";
import FormForDonationUpdate from './FormForDonationUpdate';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function UpdateDonateProd({ product, products, setProducts }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
   
  return (
    <>
    <Button onClick={() => setIsOpenModal(true)}>Update</Button>
    <Dialog
        maxWidth="lg"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        TransitionComponent={Transition}
        className="detailsModal"
      >
        <Button className="close" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>
        <FormForDonationUpdate 
            products={products}
            setProducts={setProducts}
            product={product}
        />
      </Dialog>
    </>
  )
}

export default UpdateDonateProd