import React from "react";
import { baseURL } from "../../utils/config";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function ProductComments({ comments, setComments }) {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const handleDeleteComment = async (commentId) => {
    if (!token) {
      toast.warning("You need to login to delete a comment.");
      navigate("/admin/login");
      return;
    }

    try {
      await appAxios.delete(`/api/comment/deleteadmin/${commentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );

      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="productComments">
      <h3>Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div className="comment" key={index}>
            <img src={baseURL + comment?.userId?.avatar} alt="..." />
            <h4 className="mb-0">{comment.userId?.name}:</h4>
            <div>
              <p className="mb-0">{comment.comment} </p>
              <p className="mb-0">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className="deleteComment"
              onClick={() => handleDeleteComment(comment?._id)}
            >
              <MdDelete />
            </span>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}

export default ProductComments;
