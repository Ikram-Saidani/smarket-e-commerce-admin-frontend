import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
function AddAmbassador({ group, groups, setGroups }) {
  const token = localStorage.getItem("adminToken");
  const [ambassadorsNotInGroup, setAmbassadorsNotInGroup] = useState([]);
  useEffect(() => {
    appAxios
      .get(`/api/user/unassignedambassadors`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAmbassadorsNotInGroup(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const handleAddAmbassador = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to add this ambassador?")) {
      appAxios
        .put(
          `/api/group/addAmbassador/${group?._id}`,
          {
            ambassador: e.target.value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          toast.success("Ambassador added successfully");
          setGroups(
            groups.map((g) => {
              if (g?._id === group?._id) {
                g.ambassadors.push(e.target.value);
              }
              return g;
            })
          );
        })
        .catch((err) => {
          toast.warning(err.response.data.error);
          console.log(err);
        });
    } else {
      toast.info("Ambassador addition canceled");
    }
  };

  return (
    <FormControl className="addMember">
      <InputLabel id="demo-simple-select-helper-label">Add Member</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper-gender"
        name="addAmbassador"
        label="Replace Coordinator"
        className="selectCoordinator"
        onChange={(e) => handleAddAmbassador(e)}
        value=""
      >
        {ambassadorsNotInGroup.length > 0 ? (
            ambassadorsNotInGroup.map((amba, i) => (
                <MenuItem key={i} className="menuCoordinator" value={amba?._id}>
                  {amba.name}
                </MenuItem>
              ))
        ):(
            <MenuItem className="menuCoordinator" value="">
                No ambassador available
            </MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default AddAmbassador;
