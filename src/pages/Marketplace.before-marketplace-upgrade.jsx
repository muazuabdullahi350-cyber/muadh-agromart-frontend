import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-lg text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          MU'ADH AGROMART Marketplace
        </h1>

        <p className="text-gray-600 mt-2">
          Discover verified livestock, feeds and agricultural products.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No products available
          </h2>

          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              <img
                src={
                  product.images?.[0] ||
                  "https://picsum.photos/400/300"
                }
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h2>

                <p className="text-green-700 font-bold text-xl mt-2">
                  ₦{Number(product.price || 0).toLocaleString()}
                </p>

                <p className="text-gray-600 mt-2 capitalize">
                  {product.category}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Stock: {product.stockQuantity ?? 0}
                </p>

                <div className="flex flex-col gap-2 mt-4">

                  <Link
                    to={`/product/${product._id}`}
                    className="w-full text-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.stockQuantity}
                    className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {product.stockQuantity
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Marketplace;
