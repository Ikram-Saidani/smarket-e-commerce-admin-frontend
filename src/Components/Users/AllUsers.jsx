import React, { useEffect, useState } from "react";
import BarForUsers from "./BarForUsers";
import UsersBox from "./UsersBox";
import useFetchAllUsers from "../../customHooks/user/useFetchAllUsers";
import useFetchCoordinators from "../../customHooks/user/useFetchCoordinators";
import useFetchAmbassadors from "../../customHooks/user/useFetchAmbassadors";
import useFetchUsersWithUserRole from "../../customHooks/user/useFetchUsersWithUserRole";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

function AllUsers() {
  const token = localStorage.getItem("adminToken");
  const [selected, setSelected] = useState("all");
  const [users, setUsers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [ambassadors, setAmbassadors] = useState([]);
  const [usersWithUserRole, setUsersWithUserRole] = useState([]);
  const [noOrderUser, setNoOrderUser] = useState([]);
  const [birthMonthUser, setBirthMonthUser] = useState([]);
  const allUsers = useFetchAllUsers();
  const coorUsers = useFetchCoordinators();
  const ambaUsers = useFetchAmbassadors();
  const usersRole = useFetchUsersWithUserRole();

  useEffect(() => {
    setUsers(allUsers);
    setCoordinators(coorUsers);
    setAmbassadors(ambaUsers);
    setUsersWithUserRole(usersRole);
    appAxios
      .get("/api/user/firstorder", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setNoOrderUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
    appAxios
      .get("/api/user/birthday", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setBirthMonthUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  }, [allUsers, coorUsers, ambaUsers, usersRole, token]);
  const handleNotifyBithDiscount = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/birthday",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  const handleNotifyFirstOrder = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/firstorder",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  const handleNotifyAmbassadorEligibility = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/ambassador",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  const handleNotifyCoordinatorEligibility = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/coordinator",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  const handleNotifyCoinsForHope = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/coinsforhope",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  const handleNotifyAffordableProducts = (e) => {
    e.preventDefault();
    appAxios
      .post(
        "/api/notification/affordable",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Notification sended successfully.");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };
  return (
    <div className="allUsers">
      <div className="usersBar">
        <BarForUsers setSelected={setSelected} />
      </div>
      <h3 className="userPageTitle">{selected}</h3>
      {selected === "all" && (
        <div className="affordable">
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyAffordableProducts}
          >
            Notify users about affordable products with their coins
          </Button>
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyCoinsForHope}
          >
            Notify users that they can donate their coins for hope
          </Button>
          <div className="usersBoxes">
            {users?.length > 0 ? (
              users.map((user) => (
                <UsersBox
                  user={user}
                  key={user._id}
                  users={users}
                  setUsers={setUsers}
                />
              ))
            ) : (
              <p>No user with this filter.</p>
            )}
          </div>
        </div>
      )}
      {selected === "coordinators" && (
        <div className="usersBoxes">
          {coordinators?.length > 0 ? (
            coordinators.map((user) => (
              <UsersBox
                user={user}
                key={user._id}
                users={users}
                setUsers={setUsers}
              />
            ))
          ) : (
            <p>No user with this filter.</p>
          )}
        </div>
      )}
      {selected === "ambassadors" && (
        <div className="coordinatorEligibility">
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyCoordinatorEligibility}
          >
            Notify eligibility to become coordinators
          </Button>
          <div className="usersBoxes">
            {ambassadors?.length > 0 ? (
              ambassadors.map((user) => (
                <UsersBox
                  user={user}
                  key={user._id}
                  users={users}
                  setUsers={setUsers}
                />
              ))
            ) : (
              <p>No user with this filter.</p>
            )}
          </div>
        </div>
      )}
      {selected === "users" && (
        <div className="ambassadorEligibility">
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyAmbassadorEligibility}
          >
            Notify eligibility to become ambassadors
          </Button>
          <div className="usersBoxes">
            {usersWithUserRole?.length > 0 ? (
              usersWithUserRole.map((user) => (
                <UsersBox
                  user={user}
                  key={user._id}
                  users={users}
                  setUsers={setUsers}
                />
              ))
            ) : (
              <p>No user with this filter.</p>
            )}
          </div>
        </div>
      )}
      {selected === "no order" && (
        <div className="noOrder">
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyFirstOrder}
          >
            Notify users for first order discount
          </Button>

          <div className="usersBoxes">
            {noOrderUser?.length > 0 ? (
              noOrderUser.map((user) => (
                <UsersBox
                  user={user}
                  key={user._id}
                  users={users}
                  setUsers={setUsers}
                />
              ))
            ) : (
              <p>No user with this filter.</p>
            )}
          </div>
        </div>
      )}

      {selected === "birth month" && (
        <div className="birthMonth">
          <Button
            className="discountNotificationButton"
            onClick={handleNotifyBithDiscount}
          >
            Notify users for birth month discount
          </Button>

          <div className="usersBoxes">
            {birthMonthUser?.length > 0 ? (
              birthMonthUser.map((user) => (
                <UsersBox
                  user={user}
                  key={user._id}
                  users={users}
                  setUsers={setUsers}
                />
              ))
            ) : (
              <p>No user with this filter.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
