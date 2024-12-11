import React from "react";
import { Button } from "@mui/material";


function UserNavbar({ setAllUsers, setRoleRequest, setGroup }) {
  return (
    <div className="navBar">
      <Button
        onClick={() => {
          setAllUsers(true);
          setRoleRequest(false);
          setGroup(false);
        }}
      >
        GET USERS
      </Button>

      <Button
        onClick={() => {
          setAllUsers(false);
          setRoleRequest(true);
          setGroup(false);
        }}
      >
        role request
      </Button>
      <Button
        onClick={() => {
          setAllUsers(false);
          setRoleRequest(false);
          setGroup(true);
        }}
      >
        group
      </Button>
    </div>
  );
}

export default UserNavbar;
