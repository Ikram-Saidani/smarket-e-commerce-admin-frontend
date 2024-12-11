import React, { useEffect, useState } from "react";
import AddAmbassador from "./AddAmbassador";
import { useNavigate } from "react-router-dom";
import appAxios from "../../utils/axiosConfig";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import RemoveAmba from "./RemoveAmba";
import ReplaceCoordinator from "./ReplaceCoordinator";

function BoxGroups({ group, groups, setGroups, groupSales }) {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
    groupSales.forEach((groupSale) => {
      if (groupSale.groupId === group._id) {
        setTotalSales(groupSale.totalSales);
      }
    });
    appAxios
      .get(`/api/group/${group._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setGroupDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, navigate, group._id, groupSales]);
  const handleDeleteGroup = () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      appAxios
        .delete(`/api/group/${group._id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          toast.success("Group deleted successfully");
          setGroups(groups.filter((g) => g._id !== group._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="groupBox">
      <div className="info">
        <h5>{group._id}</h5>
        <div className="groupBoxInside">
          {groupDetails.map((member) => (
            <div className="detail" key={member._id}>
              <p className="mb-0">
                <span>
                  <strong>{member.role} : </strong>
                  {member.name} ,
                </span>
                <span> {member.phone}</span>
              </p>
              {member.role === "ambassador" && (
                <RemoveAmba
                  member={member._id}
                  group={group}
                  groups={groups}
                  setGroups={setGroups}
                />
              )}
              {member.role === "coordinator" && (
                <ReplaceCoordinator
                  member={member._id}
                  group={group}
                  groups={groups}
                  setGroups={setGroups}
                />
              )}
            </div>
          ))}
          <p>
            <strong>Total Sales : </strong>
            {totalSales.toFixed(2)} $
          </p>
        </div>
      </div>
      <div className="buttonForUserBox">
        <AddAmbassador group={group} groups={groups} setGroups={setGroups} />
        <Button
          onClick={(e) => {
            handleDeleteGroup(e);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BoxGroups;
