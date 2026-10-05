import { useEffect, useState } from "react";
import api from "../../services/api";

function PendingProducts() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const loadProducts = async () => {
    try {
      const res = await api.get("/products/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const approveProduct = async (id) => {
    await api.patch(
      `/products/${id}/approve`,
      { approve: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadProducts();
  };

  const rejectProduct = async (id) => {
    await api.patch(
      `/products/${id}/approve`,
      { approve: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Pending Products
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-green-700 text-white">
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border">
              <td className="p-3">{product.name}</td>
              <td className="p-3">
                ₦{product.price?.toLocaleString()}
              </td>
              <td className="p-3">
                {product.stockQuantity}
              </td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => approveProduct(product._id)}
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectProduct(product._id)}
                  className="bg-red-700 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingProducts;
