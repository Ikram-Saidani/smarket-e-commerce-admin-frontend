import React, { useEffect } from "react";
import appAxios from "../utils/axiosConfig";

function Users() {
//   //get all users
//   const token = localStorage.getItem("authToken");
//   useEffect(() => {
//     appAxios
//       .get("/api/user", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get user details
//   useEffect(() => {
//     appAxios
//       .get("/api/user/me", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get users that have not made any order
//   useEffect(() => {
//     appAxios
//       .get("/api/user/firstorder", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //notify first order discount
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/firstorder", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get coordinators
//   useEffect(() => {
//     appAxios
//       .get("/api/user/coordinators", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get ambassadors
//   useEffect(() => {
//     appAxios
//       .get("/api/user/ambassadors", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //notify coordinator eligibility
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/coordinator", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get users
//   useEffect(() => {
//     appAxios
//       .get("/api/user/users", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //notify ambassador eligibility
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/ambassador", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //delete user
//   useEffect(() => {
//     appAxios
//       .delete("/api/user/:id", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get users that their birthday is in this month
//   useEffect(() => {
//     appAxios
//       .get("/api/user/birthday", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //notify users that they earned 5%discount because of their birthday month
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/birthday", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get coordinators that are not assigned to any group
//   useEffect(() => {
//     appAxios
//       .get("/api/user/unassignedcoordinators", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get ambassadors that are not assigned to any group
//   useEffect(() => {
//     appAxios
//       .get("/api/user/unassignedambassadors", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //Add Coordinator and Ambassadors to a Group
//   useEffect(() => {
//     appAxios
//       .post("/api/group/create", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //change Ambassador from Group to Another Group
//   useEffect(() => {
//     appAxios
//       .put("/api/group/:groupId/updateambassador", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //Delete Coordinator and Replace him with another one
//   useEffect(() => {
//     appAxios
//       .delete("/api/group/:groupId/deletecoordinator", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //Delete Ambassador from Group
//   useEffect(() => {
//     appAxios
//       .delete("/api/group/:groupId/deleteambassador", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //Get Total Sales for Group in a Month
//   useEffect(() => {
//     appAxios
//       .get("/api/group/totalsales/:month", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //Get all groups
//   useEffect(() => {
//     appAxios
//       .get("/api/group", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
// //notify affordable products
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/affordable", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //notify coins for hope
//   useEffect(() => {
//     appAxios
//       .post("/api/notification/coinsforhope", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get all role requests
//   useEffect(() => {
//     appAxios
//       .get("/api/roleRequest", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //get role requests with status filter
//   useEffect(() => {
//     appAxios
//       .get("/api/roleRequest/:status", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //update status by admin, change the role of user if the status is approved and send notification to user that their request has been approved or rejected
//   useEffect(() => {
//     appAxios
//       .put("/api/roleRequest/:id", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
//   //delete role requests if status is rejected or approved
//   useEffect(() => {
//     appAxios
//       .delete("/api/roleRequest/delete/:id", {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [token]);
  return <div className="mainPage">Users</div>;
}

export default Users;
