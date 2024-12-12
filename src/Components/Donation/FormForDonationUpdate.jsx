import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";

function FormForDonationUpdate({ product, products, setProducts }) {
    const token = localStorage.getItem("adminToken");
    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (!product._id) {
          console.error("Item id is undefined or null.");
          toast.error("Invalid product ID.");
          return;
        }
        appAxios
          .get(`/api/helpAndHope/${product._id}`,
            { headers: { Authorization: token } }
          )
          .then((res) => {
            const fetchedProduct = res.data.data;
            setFormData(fetchedProduct);
            if (!fetchedProduct) {
              toast.warning("No product available.");
            }
          })
          .catch((err) => {
            console.error("Error fetching product:", err);
            toast.error("Failed to fetch product. Please try again later.");
          });
      }, [product._id, token]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleUpdateProduct = (e) => {
        e.preventDefault();
        appAxios
          .put(`/api/helpAndHope/update/${product._id}`, formData, {
            headers: { Authorization: token },
          })
          .then(() => {
            const updatedProducts = products.map((prod) => {
                if (prod._id === product._id) {
                    return { ...prod, ...formData };
                    }
                    return prod;
                });
                setProducts(updatedProducts);
            toast.success("Product updated successfully!");
          })
          .catch((err) => {
            console.error("Error updating product:", err);
            toast.error("Failed to update product.");
          });
      };
    return (
    <div className="updateForm">
      <h2>Edit Product</h2>
      <form onSubmit={(e) => handleUpdateProduct(e)}>
        <TextField
          label="Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Theme"
          name="theme"
          value={formData.theme || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Coins"
          name="coins"
          value={formData.coins || ""}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />

        <br />
        <Button
          variant="contained"
          color="primary"
          className="updateButton"
          type="submit"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default FormForDonationUpdate;
