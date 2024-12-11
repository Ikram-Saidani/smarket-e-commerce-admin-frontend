import React from "react";
import { baseURL } from "../../utils/config";
import { Button } from "@mui/material";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import UpdateRole from "./UpdateRole";

function UsersBox({ user, users, setUsers }) {
  const token = localStorage.getItem("adminToken");
  const handleDeleteUser = () => {
    appAxios
      .delete(`/api/user/delete/${user._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        toast.success("User deleted successfully");
        setUsers(users.filter((u) => u._id !== user._id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting user");
      });
  };
  return (
    <div className="userBox">
      <div className="info">
        <img src={`${baseURL}${user.avatar}`} alt="user_image" />
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
      <div className="buttonForUserBox">
        <UpdateRole userId={user._id} users={users} setUsers={setUsers} />
        <Button onClick={handleDeleteUser}>Delete</Button>
      </div>
    </div>
  );
}

export default UsersBox;
