import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";
import { Button, TextField } from "@mui/material";

function FormForUpdate({ itemId ,products, setProducts}) {
  const token = localStorage.getItem("adminToken");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!itemId) {
      console.error("Item id is undefined or null.");
      toast.error("Invalid product ID.");
      return;
    }
    appAxios
      .get(`/api/product/${itemId}`)
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
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, index, newValue) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = newValue;
    setFormData({ ...formData, [name]: updatedArray });
  };

  const handleAddSize = () => {
    setFormData({
      ...formData,
      size: [...(formData.size || []), { size: "", quantity: "" }],
    });
  };

  const handleAddshoeSize = () => {
    setFormData({
      ...formData,
      shoeSize: [...(formData.shoeSize || []), { shoeSize: "", quantity: "" }],
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    appAxios
      .put(`/api/product/update/${itemId}`, formData, {
        headers: { Authorization: token },
      })
      .then(() => {
        const updatedProducts = products.map((product) => {
          if (product._id === itemId) {
            return formData;
          }
          return product;
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
      <form onSubmit={(e)=>handleUpdateProduct(e)}>
        <TextField
          label="Title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price?.toFixed(2) || ""}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Old Price"
          name="oldPrice"
          value={formData.oldPrice || ""}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discount"
          name="discount"
          value={formData.discount || ""}
          onChange={handleChange}
          type="number"
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
        <TextField
          label="Count In Stock"
          name="countInStock"
          value={formData.countInStock || ""}
          fullWidth
          type="number"
          margin="normal"
          onChange={handleChange}
        />
     {formData.ingredients?.length > 0 && (
          <>
            <h4>Ingredients</h4>
            {formData.ingredients.map((ingredient, index) => (
              <TextField
                key={index}
                label={`Ingredient ${index + 1}`}
                value={ingredient || ""}
                fullWidth
                margin="normal"
                onChange={(e) =>
                  handleArrayChange("ingredients", index, e.target.value)
                }
              />
            ))}
          </>
        )}
        {formData.expiryDate && (
          <TextField
            label="Expiry Date"
            name="expiryDate"
            value={new Date(formData.expiryDate).toISOString().split("T")[0]
                 || ""}
            onChange={handleChange}
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        )}
        {formData.specifications && (
          <>
            <h4>Specifications</h4>
            {Object.entries(formData.specifications).map(
              ([key, value], index) => (
                <TextField
                  key={index}
                  label={key}
                  value={value || ""}
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specifications: {
                        ...formData.specifications,
                        [key]: e.target.value,
                      },
                    })
                  }
                />
              )
            )}
          </>
        )}

        {/* Sizes Section */}
        {formData.size?.length > 0 && (
          <>
            <h4>Sizes</h4>
            {formData.size.map((s, index) => (
              <div key={index}>
                <TextField
                  label={`Size ${index + 1}`}
                  value={s.size || ""}
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleArrayChange("size", index, {
                      ...s,
                      size: e.target.value,
                    })
                  }
                />
                <TextField
                  label={`Quantity for Size ${index + 1}`}
                  value={s.quantity || ""}
                  type="number"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleArrayChange("size", index, {
                      ...s,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddSize}
              style={{ marginTop: "10px" }}
            >
              Add Size
            </Button>
          </>
        )}

        {/* Shoe Sizes Section */}
        {formData.shoeSize?.length > 0 && (
          <>
            <h4>Shoe Sizes</h4>
            {formData.shoeSize?.map((s, index) => (
              <div key={index}>
                <TextField
                  label={`Shoe Size ${index + 1}`}
                  value={s.shoeSize || ""}
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleArrayChange("shoeSize", index, {
                      ...s,
                      shoeSize: e.target.value,
                    })
                  }
                />
                <TextField
                  label={`Quantity for Shoe Size ${index + 1}`}
                  value={s.quantity || ""}
                    type="number"
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    handleArrayChange("shoeSize", index, {
                      ...s,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddshoeSize}
              style={{ marginTop: "10px" }}
            >
              Add Shoe Size
            </Button>
          </>
        )}
<br/>
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

export default FormForUpdate;
