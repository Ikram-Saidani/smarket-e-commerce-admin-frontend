import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Dialog } from "@mui/material";
import FormForUpdate from "./FormForUpdate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateProduct({ item }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const itemId = item?._id;
  useEffect(() => {
    if (!itemId) {
      console.error("itemId is undefined or null.");
      toast.error("Invalid product ID.");
      return;
    }
    appAxios
      .get(`/api/comment/getcomments/${itemId}`)
      .then((res) => {
       
      })
      .catch((err) => {
        console.error("Error fetching comments for this product", err);
        toast.error("Failed to fetch comments. Please try again later.");
      });
  }, [itemId]);
  return (
    <>
      <Button onClick={() => setIsOpenModal(true)}>Edit</Button>
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
        <FormForUpdate itemId={item._id}/>
      </Dialog>
    </>
  )
}

export default UpdateProduct