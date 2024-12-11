import React, { useEffect, useState } from "react";
import { baseURL } from "../../utils/config";
import { Button } from "@mui/material";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function BoxRequest({ request, roleRequest, setRoleRequest }) {
  const token = localStorage.getItem("adminToken");
  const [status, setStatus] = useState("");
  const handleApproveRequest = () => {
    setStatus("approved");
  };
  const handleRejectRequest = () => {
    setStatus("rejected");
  };

  useEffect(() => {
    if (status) {
      appAxios
        .put(`/api/roleRequest/${request._id}`, { status }, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          toast.success(res.data.data);
          setRoleRequest(roleRequest.filter((req) => req._id !== request._id));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }, [status, request._id, roleRequest, setRoleRequest, token]);
  return (
    <div className="userBox">
      <div className="info">
        <img src={`${baseURL}${request.userId.avatar}`} alt="user_image" />
        <div>
          <h3>{request.userId.name}</h3>
          <p>Email: {request.userId.email}</p>

          <p>Role: {request.userId.role}</p>
          <p>{request.message}</p>
          <p>{new Date(request.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="buttonForUserBox">
        <Button onClick={handleApproveRequest}>Approve</Button>
        <Button onClick={handleRejectRequest}>Reject</Button>
      </div>
    </div>
  );
}

export default BoxRequest;
