import { Button } from "@mui/material";
import { Menu, MenuItem, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navBar">
      <>
      <IconButton onClick={handleClick}>GET USERS</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/admin/users" onClick={handleClose}>
          All Users
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/users/rolecoordinator"
          onClick={handleClose}
        >
          Coordinators
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/users/roleambassador"
          onClick={handleClose}
        >
          Ambassadors
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin/users/roleuser"
          onClick={handleClose}
        >
          users
        </MenuItem>
      </Menu>
      </>
      <Button>role request</Button>
      <Button>group</Button>
    </div>
  );
}

export default UserNavbar;
