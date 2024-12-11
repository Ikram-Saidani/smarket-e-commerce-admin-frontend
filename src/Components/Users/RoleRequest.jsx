import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BoxRequest from "./BoxRequest";

function RoleRequest() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [roleRequest, setRoleRequest] = useState([]);
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    } else {
      appAxios
        .get("/api/roleRequest/pending", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setRoleRequest(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }, [token, navigate]);

  return (
    <>
      <h3 className="mb-0 mt-2">Role Request</h3>
      <div className="roleRequest">
        {roleRequest?.length > 0 ? (
          roleRequest.map((request) => (
            <BoxRequest
              key={request._id}
              roleRequest={roleRequest}
              setRoleRequest={setRoleRequest}
              request={request}
            />
          ))
        ) : (
          <p>No role request available at the moment.</p>
        )}
      </div>
    </>
  );
}

export default RoleRequest;
