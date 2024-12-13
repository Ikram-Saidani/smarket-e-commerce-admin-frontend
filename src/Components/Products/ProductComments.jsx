import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Dialog } from "@mui/material";
import Comments from "./Comments";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductComments({ item }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
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
        const fetchedComments = res.data.data;
        setComments(fetchedComments);
        if (!fetchedComments) {
          toast.warning("No comment available.");
        }
      })
      .catch((err) => {
        console.error("Error fetching comments for this product", err);
      });
  }, [itemId]);
  return (
    <>
      <Button onClick={() => setIsOpenModal(true)}>Comments</Button>
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
        <Comments comments={comments} setComments={setComments} />
      </Dialog>
    </>
  );
}

export default ProductComments;
