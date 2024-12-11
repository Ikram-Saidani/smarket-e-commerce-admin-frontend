import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function UpdateRole({ userId, users, setUsers }) {
  const token = localStorage.getItem("adminToken");
  const role = ["admin", "coordinator", "ambassador", "user"];
  const [selectedRole, setSelectedRole] = useState("");

const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    if(window.confirm("Are you sure you want to update this user's role?")) {
    appAxios
      .put(
        `/api/user/role/${userId}`,
        { role: e.target.value },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: e.target.value } : user
          )
        );
        toast.success("Role updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      })

    } else {
      toast.info("Role update canceled");
    }
  }


  return (
    <FormControl className="updateRole">
      <InputLabel id="demo-simple-select-helper-label">Update Role</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper-gender"
        name="role"
        value={selectedRole}
        label="role"
        className="selectRole"
        onChange={(e) => handleRoleChange(e)}
      >
        {role.map((item, i) => (
          <MenuItem key={i} className="menuRole" value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default UpdateRole;

