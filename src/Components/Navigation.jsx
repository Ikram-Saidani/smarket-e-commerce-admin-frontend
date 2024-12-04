// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import CategoryIcon from "@mui/icons-material/Category";
// import PeopleIcon from "@mui/icons-material/People";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { toast } from "react-toastify";

// const drawerWidth = 240;

// const Navigation = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const menuItems = [
//     { text: "Home", icon: <HomeIcon />, path: "/admin/home" },
//     { text: "Products", icon: <CategoryIcon />, path: "/admin/products" },
//     { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
//     { text: "Orders", icon: <ShoppingCartIcon />, path: "/admin/orders" },
//     { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: "auto" }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem button key={item.text} onClick={() => navigate(item.path)}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//             <ListItem button onClick={handleLogout}>
//               <ListItemIcon>
//                 <LogoutIcon />
//               </ListItemIcon>
//               <ListItemText primary="Logout" />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: `calc(100% - ${drawerWidth}px)`,
//           mt: 8,
//         }}
//       >
//         <Toolbar />
//         <Typography variant="body1">Welcome to the Admin Dashboard!</Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Navigation;

import React from 'react'

function Navigation() {
  return (
    <div>Navigation</div>
  )
}

export default Navigation