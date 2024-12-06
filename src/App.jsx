import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Components/Navigation/Navigation";
import Products from "./Pages/Products";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Navigation/Header";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import Donation from "./Pages/Donation";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/donation" element={<Donation />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
