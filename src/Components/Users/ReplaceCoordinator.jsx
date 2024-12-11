import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function ReplaceCoordinator({ group, groups, setGroups, member }) {
  const token = localStorage.getItem("adminToken");
  const [coordinatorsNotInGroup, setCoordinatorsNotInGroup] = useState([]);

  useEffect(() => {
    appAxios
      .get(`/api/user/unassignedcoordinators`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setCoordinatorsNotInGroup(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const handleReplaceCoordinator = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to replace this coordinator?")) {
      appAxios
        .put(
          `/api/group/replacecoordinator/${group._id}`,
          {
            coordinatorId: e.target.value,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          toast.success("Coordinator replaced successfully");
          setGroups(groups.filter((g) => g._id !== group._id));
        })
        .catch((err) => {
          toast.warning(err.response.data.error);
          console.log(err);
        });
    } else {
      toast.info("Coordinator replacement canceled");
    }
  };
  return (
    <FormControl className="relplaceCoordinator">
      <InputLabel id="demo-simple-select-helper-label">Replace</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper-gender"
        name="replaceCoordinator"
        label="Replace Coordinator"
        className="selectCoordinator"
        onChange={(e) => handleReplaceCoordinator(e)}
        value=""
      >
        {coordinatorsNotInGroup.length > 0 ? (
            coordinatorsNotInGroup.map((coord, i) => (
                <MenuItem key={i} className="menuCoordinator" value={coord._id}>
                  {coord.name}
                </MenuItem>
              ))
        ):(
            <MenuItem className="menuCoordinator" value="">
                No coordinator available
            </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default ReplaceCoordinator;
