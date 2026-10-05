import { useState } from "react";
import api from "../../services/api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "livestock",
    description: "",
    price: "",
    stockQuantity: "",
    weightKg: "",
    images: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        images: form.images
          ? form.images.split(",").map((img) => img.trim())
          : [],
      };

      const res = await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");

      console.log(res.data);

      setForm({
        name: "",
        category: "livestock",
        description: "",
        price: "",
        stockQuantity: "",
        weightKg: "",
        images: "",
      });
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to add product."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="livestock">Livestock</option>
          <option value="feed">Feed</option>
          <option value="medicine">Medicine</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={form.stockQuantity}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="weightKg"
          placeholder="Weight (Kg)"
          value={form.weightKg}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma separated)"
          value={form.images}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
