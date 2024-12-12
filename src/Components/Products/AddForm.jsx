import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddForm({ selectedCategory,products, setProducts }) {
  const token = localStorage.getItem("adminToken");
  const [selectedImage, setSelectedImage] = useState(null);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    oldPrice: "",
    discount: "",
    size: [],
    shoeSize: [],
    specifications: {},
    ingredients: [],
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeForSize = (e) => {
    const { name, value } = e.target;

    if (selectedCategory === "fashion") {
      setProductData((prev) => ({
        ...prev,
        size: [
          { ...prev.size[0], [name]: name === "quantity" ? +value : value },
        ],
      }));
    }

    if (selectedCategory === "footwear") {
      setProductData((prev) => ({
        ...prev,
        shoeSize: [
          { ...prev.shoeSize[0], [name]: name === "quantity" ? +value : value },
        ],
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("category", selectedCategory);
    formData.append("oldPrice", Number(productData.oldPrice));
    formData.append("discount", Number(productData.discount));
    formData.append("countInStock", Number(productData.countInStock));
    if (selectedCategory === "fashion") {
        formData.append("size", JSON.stringify(productData.size));
    }

    if (selectedCategory === "footwear") {
        formData.append("shoeSize", JSON.stringify(productData.shoeSize));
    }

    if (selectedCategory === "beauty") {
        formData.append("ingredients", JSON.stringify(productData.ingredients));
    }

    if (selectedCategory === "electronics") {
        formData.append("specifications", JSON.stringify(productData.specifications));
    }

    if (selectedCategory === "groceries") {
        formData.append("expiryDate", new Date(productData.expiryDate));
    }

    formData.append("image", selectedImage);

    try {
      const response = await appAxios.post("/api/product", formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === "success") {
        toast.success("Product added successfully");
        setProducts([...products, response.data.data]);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Category"
        name="category"
        value={selectedCategory}
        type="text"
        fullWidth
        disabled
        margin="normal"
      />
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
      <TextField
        label="Description"
        name="description"
        value={productData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Old Price $"
        name="oldPrice"
        value={productData.oldPrice}
        onChange={handleChange}
        type="number"
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Discount %"
        name="discount"
        value={productData.discount}
        onChange={handleChange}
        type="number"
        required
        fullWidth
        margin="normal"
      />

      {/* Count In Stock */}
      
        <TextField
          label="Count In Stock"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleChange}
          type="number"
          fullWidth
          required
          margin="normal"
         disabled={selectedCategory === "fashion" ||  selectedCategory === "footwear"}
        />

      {/* Sizes */}
      {selectedCategory === "fashion" && (
        <>
          <h4>Size (e.g., XS, S, M, L, XL)</h4>

          <TextField
            label={`Size`}
            value={productData.size.size}
            fullWidth
            margin="normal"
            required
            onChange={handleChangeForSize}
            name="size"
          />
          <TextField
            label={`Quantity for Size`}
            value={productData.size.quantity}
            type="number"
            fullWidth
            margin="normal"
            required
            onChange={handleChangeForSize}
            name="quantity"
          />
        </>
      )}

      {/* Shoe Sizes */}
      {selectedCategory === "footwear" && (
        <>
          <h4>Shoe Sizes (e.g 36, 37, 38, 39, 40, 42, 44, 46, 48)</h4>

          <div>
            <TextField
              label={`Shoe Size`}
              value={productData.shoeSize.shoeSize}
              fullWidth
              margin="normal"
              required
              onChange={handleChangeForSize}
              name="shoeSize"
            />
            <TextField
              label={`Quantity for Shoe Size`}
              value={productData.shoeSize.quantity}
              type="number"
              fullWidth
              margin="normal"
              required
              onChange={handleChangeForSize}
              name="quantity"
            />
          </div>
        </>
      )}

      {/* Ingredients Section */}
      {selectedCategory === "beauty" && (
        <>
          <h4>Ingredients (Enter ingredients separated by commas)</h4>

          <TextField
            label={`Ingredient`}
            name="ingredients"
            value={productData.ingredients}
            fullWidth
            required
            margin="normal"
            onChange={handleChange}
          />
        </>
      )}

      {/* Specifications Section */}
      {selectedCategory === "electronics" && (
        <>
          <h4>Specifications (key:value,key:value...)</h4>
          <TextField
            label={`Specification`}
            value={productData.specifications}
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
            name="specifications"
          />
        </>
      )}
      {/* expiryDate Section */}
      {selectedCategory === "groceries" && (
        <>
          <h4>Expiry Date</h4>

          <TextField
            name="expiryDate"
            type="date"
            value={productData.expiryDate}
            fullWidth
            margin="normal"
            required
            onChange={handleChange}
          />
        </>
      )}

      <div className="imageInput">
        <label>Image</label>
        <input type="file" name="image" onChange={handleFileChange} required />
      </div>

      <Button
        variant="contained"
        color="primary"
        className="addButton"
        type="submit"
        style={{ marginTop: "20px" }}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  );
}

export default AddForm;
