import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";

function RemoveAmba({ group, groups, setGroups, member }) {
    const token = localStorage.getItem("adminToken");
    const handleDeleteMember = (e) => {
        e.preventDefault()
    if (window.confirm("Are you sure you want to delete this member?")) {
      appAxios
        .delete(
          `/api/group/deletemember/${group._id}`,
            {
                headers: {
                Authorization: token,
                },
                data: { member: member },
            }
        )
        .then((res) => {
          toast.success("Member deleted successfully");
          setGroups(groups.filter((g) => g._id !== group._id));
        })
        .catch((err) => {
          toast.warning(err.response.data.error);
          console.log(err);
        });
    } else {
      toast.info("Member delete canceled");
    }
  };
  return (
    <Button
      onClick={(e) => {
        handleDeleteMember(e);
      }}
    >
      Remove
    </Button>
  );
}

export default RemoveAmba;
