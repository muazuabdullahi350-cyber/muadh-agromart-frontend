import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProductApproval() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const approveProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/products/${id}/approve`,
        { approve: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Approved Successfully");
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Approval failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Product Approval
      </h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg p-4 mb-4"
        >
          <h2 className="text-xl font-bold">
            {product.name}
          </h2>

          <p>{product.description}</p>

          <p>₦{product.price}</p>

          <p>Status: {product.status}</p>

          <button
            onClick={() => approveProduct(product._id)}
            className="bg-green-700 text-white px-5 py-2 rounded mt-3"
          >
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
