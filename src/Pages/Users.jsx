import React, { useEffect, useState } from "react";
import UserNavbar from "../Components/Users/UserNavbar";
import AllUsers from "../Components/Users/AllUsers";
import "../styles/users.css";
import RoleRequest from "../Components/Users/RoleRequest";
import { useNavigate } from "react-router-dom";
import Groups from "../Components/Users/Groups";
function Users() {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState(true);
  const [group, setGroup] = useState(false);
  const [roleRequest, setRoleRequest] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);
  return (
    <div className="mainPage usersPage">
      <UserNavbar
        setAllUsers={setAllUsers}
        setGroup={setGroup}
        setRoleRequest={setRoleRequest}
      />
      {allUsers && <AllUsers />}
      {roleRequest && <RoleRequest />}
      {group && <Groups />}
    </div>
  );
}

export default Users;
