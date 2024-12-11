import React, { useEffect, useState } from "react";
import useFetchGroups from "../../customHooks/user/useFetchGroups";
import BoxGroups from "./BoxGroups";
import CreateNewGroup from "./CreateNewGroup";
import { Button } from "@mui/material";
import appAxios from "../../utils/axiosConfig";

function Groups() {
  const token = localStorage.getItem("adminToken");
  const [groups, setGroups] = useState([]);
  const allGroups = useFetchGroups();
  const [newGroup,setNewGroup]=useState(false);
  const [groupSales, setGroupSales] = useState([]);

  useEffect(() => {
    setGroups(allGroups);
     
  
    if (groups?.length) {
      appAxios
        .get(`api/group/totalsales`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setGroupSales(res.data.data.totalSalesData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [allGroups, groups, token]);
  return (
    <>
      <h3 className="mb-2 mt-2">Groups</h3>
      <div className="usersBar">
        <Button onClick={()=>setNewGroup(false)} >All Groups</Button>
        <Button onClick={()=>setNewGroup(true)} >Create new group</Button>
      </div>
      
      {!newGroup && (
        <div className="groups">
        {groups?.length > 0 ? (
          groups.map((group) => (
            <BoxGroups
              key={group._id}
              groups={groups}
              setGroups={setGroups}
              group={group}
              groupSales={groupSales}
            />
          ))
        ) : (
          <p>No group available at the moment.</p>
        )}
      </div>
      )}
      {newGroup && (
        <CreateNewGroup groups={groups} setGroups={setGroups}/>
      )}
    </>
  );
}

export default Groups;
