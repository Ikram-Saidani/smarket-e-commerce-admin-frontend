import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
function CreateNewGroup({ setGroups, groups }) {
  const token = localStorage.getItem("adminToken");
  const [ambassadorsNotInGroup, setAmbassadorsNotInGroup] = useState([]);
  const [coordinatorsNotInGroup, setCoordinatorsNotInGroup] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [selectedAmbassadors,setSelectedAmbassadors]=useState([])
 
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


  const handleCreateGroup = () => {
    if(!selectedCoordinator){
      toast.warning("Please select a coordinator");
      return;
    }
    if (window.confirm("Are you sure you want to create this group?")) {
      appAxios
        .post(
          "/api/group/create",
          {
            coordinatorId: selectedCoordinator._id,
            ambassadorsIds: selectedAmbassadors.map((ambassador) => {
              return ambassador._id;
            }),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          toast.success("Group created successfully");
          setGroups([...groups, res.data.data]);
          setAmbassadorsNotInGroup(
            ambassadorsNotInGroup.filter((amb) => !selectedAmbassadors.includes(amb))

          );
          setCoordinatorsNotInGroup(
            coordinatorsNotInGroup.filter((coord) => coord._id !== selectedCoordinator._id)
          );
          setSelectedCoordinator("");
          setSelectedAmbassadors([]);

        })
        .catch((err) => {
          console.error(err);
          toast.error("Group creation failed");
        });
    } else {
      toast.info("Coordinator replacement canceled");
    }
  };
  const handleSelectAmbassadors = (e) => {
    const selectedAmbassador = e.target.value; // Get the selected ambassador object
    if (!selectedAmbassadors.some((amb) => amb._id === selectedAmbassador._id)) {
      // Avoid adding duplicates
      setSelectedAmbassadors([...selectedAmbassadors, selectedAmbassador]);
      setAmbassadorsNotInGroup(
        ambassadorsNotInGroup.filter((amb) => amb._id !== selectedAmbassador._id) // Remove selected ambassador from the list
      );
    }
  };
  
  
  return (
    <div className="createGroupPage">
      {coordinatorsNotInGroup.length === 0 && ambassadorsNotInGroup.length === 0 ?
      (
        <h4>You can't create a group now, no coordinator or ambassador available.</h4>
      ):(
        <div className="selectedMembers">
          <h4>Select members</h4>
        {selectedCoordinator && (
          <h3>
            <strong>Coordinator : </strong> {selectedCoordinator.name}
          </h3>
        )}
        {selectedAmbassadors.length>0 &&
          selectedAmbassadors.map((ambassador) => {
            return (
              <h3>
                <strong>Ambassador : </strong>
                {ambassador.name}
              </h3>
            );
          })}
      </div>
      )}
      {!selectedCoordinator.length && (
        <FormControl className="addCoordinator">
          <InputLabel id="demo-simple-select-helper-label">Select Coordinator</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper-gender"
            name="addCoordinator"
            label="Add Coordinator"
            className="selectCoordinator"
            onChange={(e) => setSelectedCoordinator(e.target.value)}
            value=""
          >
            {coordinatorsNotInGroup.length > 0 ? (
              coordinatorsNotInGroup.map((coord, i) => (
                <MenuItem key={i} className="menuCoordinator" value={coord}>
                  {coord.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem className="menuCoordinator" value="">
                No coordinator available
              </MenuItem>
            )}
          </Select>
        </FormControl>
      )}
      <FormControl className="addCoordinator">
  <InputLabel id="demo-simple-select-helper-label">Add Ambassador</InputLabel>
  <Select
    labelId="demo-simple-select-helper-label"
    id="demo-simple-select-helper-gender"
    name="addAmbassador"
    label="Replace Coordinator"
    className="selectCoordinator"
    onChange={handleSelectAmbassadors}
    value=""
  >
    {ambassadorsNotInGroup.length > 0 ? (
      ambassadorsNotInGroup.map((amba, i) => (
        <MenuItem key={i} className="menuCoordinator" value={amba}>
          {amba.name}
        </MenuItem>
      ))
    ) : (
      <MenuItem className="menuCoordinator" value="">
        No ambassador available
      </MenuItem>
    )}
  </Select>
</FormControl>

      <Button className="addToGroupButton" onClick={handleCreateGroup}>Create the group</Button>
    </div>
  );
}

export default CreateNewGroup;
