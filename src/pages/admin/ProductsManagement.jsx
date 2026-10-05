import { useEffect, useState } from "react";
import api from "../../services/api";

function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // LOAD PRODUCTS
  // =========================
  const loadProducts = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", res.data);

      setProducts(res.data.products || []);
    } catch (err) {
      console.error("LOAD PRODUCTS ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const openEdit = (product) => {
    setEditingProduct({
      ...product,
    });
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as CEO.");
        return;
      }

      if (!editingProduct?._id) {
        alert("No product selected.");
        return;
      }

      console.log("Saving product:", editingProduct);

      const response = await api.patch(
        `/products/${editingProduct._id}`,
        {
          name: editingProduct.name,
          category: editingProduct.category,
          subCategory: editingProduct.subCategory,
          description: editingProduct.description,
          price: Number(editingProduct.price),
          unit: editingProduct.unit,
          stockQuantity: Number(editingProduct.stockQuantity),
          weightKg: Number(editingProduct.weightKg),
          images: editingProduct.images || [],
          videoUrl: editingProduct.videoUrl || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATE SUCCESS:", response.data);

      alert("Product updated successfully!");

      setEditingProduct(null);

      await loadProducts();
    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err);
      console.error("STATUS:", err.response?.status);
      console.error("DATA:", err.response?.data);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to update product."
      );
    }
  };

  // =========================
  // RESTOCK
  // =========================
  const restockProduct = async (product) => {
    try {
      const qty = prompt(
        `Enter new stock quantity for ${product.name}:`
      );

      if (qty === null) {
        return;
      }

      if (qty === "" || isNaN(Number(qty))) {
        alert("Please enter a valid number.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as CEO.");
        return;
      }

      await api.patch(
        `/products/${product._id}/stock`,
        {
          stockQuantity: Number(qty),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock updated successfully!");

      await loadProducts();
    } catch (err) {
      console.error("RESTOCK ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to update stock."
      );
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // PAGE
  // =========================
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-green-700">
          Products Management
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your MU'ADH AGROMART products.
        </p>
      </div>

      {/* PRODUCTS CONTAINER */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h2 className="text-xl font-semibold">
            Total Products: {products.length}
          </h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border rounded-lg p-3"
          />

        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-blue-600 mb-4">
            Loading products...
          </p>
        )}

        {/* NO PRODUCTS */}
        {!loading && filteredProducts.length === 0 && (
          <p className="text-gray-500">
            No products found.
          </p>
        )}

        {/* PRODUCTS */}
        <div className="space-y-4">

          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >

              {/* PRODUCT INFORMATION */}
              <div>
                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p>
                  Price: ₦
                  {Number(product.price || 0).toLocaleString()}
                </p>

                <p>
                  Stock: {product.stockQuantity ?? 0}
                </p>

                <p className="text-sm text-gray-500">
                  Status: {product.status || "N/A"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => openEdit(product)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => restockProduct(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Restock
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* =========================
          EDIT PRODUCT MODAL
      ========================= */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-green-700">
                Edit Product
              </h2>

              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 text-3xl"
              >
                ×
              </button>

            </div>

            {/* PRODUCT NAME */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Product Name
              </label>

              <input
                type="text"
                value={editingProduct.name || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* CATEGORY */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Category
              </label>

              <input
                type="text"
                value={editingProduct.category || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* SUB CATEGORY */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Sub Category
              </label>

              <input
                type="text"
                value={editingProduct.subCategory || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    subCategory: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* PRICE */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Price
              </label>

              <input
                type="number"
                value={editingProduct.price ?? ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* STOCK */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Stock Quantity
              </label>

              <input
                type="number"
                value={editingProduct.stockQuantity ?? 0}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stockQuantity: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* UNIT */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Unit
              </label>

              <input
                type="text"
                value={editingProduct.unit || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    unit: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* WEIGHT */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Weight (Kg)
              </label>

              <input
                type="number"
                value={editingProduct.weightKg ?? ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    weightKg: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">

              <label className="block font-semibold mb-1">
                Description
              </label>

              <textarea
                value={editingProduct.description || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-lg p-3"
                rows="5"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="flex-1 bg-green-700 text-white py-3 rounded-lg"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProductsManagement;
