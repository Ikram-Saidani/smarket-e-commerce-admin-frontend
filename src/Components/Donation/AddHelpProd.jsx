import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function AddHelpProd({ products, setProducts }) {
  const token = localStorage.getItem("adminToken");
  const [selectedTheme, setSelectedTheme] = useState("");
  const theme = ["medicine", "school", "wedding", "eid", "ramadan", "winter"];
  const [productData, setProductData] = useState({
    title: "",
    theme: "",
    coins: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: productData.title,
        theme: selectedTheme,
        coins: Number(productData.coins),
    };
    appAxios
      .post("/api/helpAndHope/create", data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        toast.success("Product created successfully.");
        setProducts([...products, res.data.data]);
      })
      .catch((err) => {
        toast.error("Failed to create product.");
        console.error("Error creating product:", err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        type="text"
        value={productData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControl
      required
       className="formAddHelpProd">
        <InputLabel id="demo-simple-select-helper-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper gender"
          name="category"
          value={selectedTheme}
          label="category"
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {theme.map((item, i) => {
            return (
              <MenuItem key={i} className="menuCategory" value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        label="Coins"
        name="coins"
        value={productData.coins}
        onChange={handleChange}
        type="number"
        fullWidth
        required
        margin="normal"
      />
      <br />
     <div className='buttons'>
     <Button
        variant="contained"
        color="primary"
        className="addButton"
        type="submit"
        style={{ marginTop: "20px" }}
      >
        Add Product
      </Button>
     </div>
    </form>
  );
}

export default AddHelpProd;
