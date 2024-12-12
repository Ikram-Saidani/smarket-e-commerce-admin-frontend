import React, { useEffect, useState } from "react";
import DonationBox from "./DonationBox";
import appAxios from "../../utils/axiosConfig";

function DonationHistories() {
  const token = localStorage.getItem("adminToken");
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    appAxios
      .get("/api/donationHistory/status/false", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setDonations(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token,setDonations]);
  return (
    <div className="allUsers">
      <h3 className="userPageTitle">Donations Not Completed</h3>

      <div className="usersBoxes">
        {donations?.length > 0 ? (
          donations.map((donation) => (
            <DonationBox
              donation={donation}
              key={donation._id}
              donations={donations}
              setDonations={setDonations}
            />
          ))
        ) : (
          <p>No donation available.</p>
        )}
      </div>
    </div>
  );
}

export default DonationHistories;
