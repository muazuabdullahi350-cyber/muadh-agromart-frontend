import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      if (
        product.stockQuantity &&
        existing.quantity >= product.stockQuantity
      ) {
        alert("You have reached the available stock quantity.");
        return;
      }

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
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-600 text-lg">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">

        <h1 className="text-4xl font-bold text-red-600">
          Product Not Found
        </h1>

        <p className="text-gray-600 mt-3">
          This product may have been removed or is unavailable.
        </p>

        <Link
          to="/marketplace"
          className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Marketplace
        </Link>

      </div>
    );
  }

  const image =
    product.images?.[0] ||
    product.image ||
    "https://picsum.photos/800/600";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <Link
        to="/marketplace"
        className="text-green-700 font-bold"
      >
        ← Back to Marketplace
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 mt-6">

        <div>
          <img
            src={image}
            alt={product.name}
            className="w-full max-h-[600px] object-cover rounded-2xl shadow-xl"
          />
        </div>

        <div>

          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
            ✓ Verified Product
          </span>

          <h1 className="text-4xl font-bold mt-4 text-gray-900">
            {product.name}
          </h1>

          <p className="text-yellow-500 text-xl mt-3">
            ⭐⭐⭐⭐⭐
          </p>

          <h2 className="text-5xl font-bold text-green-700 mt-4">
            ₦{Number(product.price || 0).toLocaleString()}
          </h2>

          <div className="mt-6 space-y-3 text-gray-700">

            <p>
              <strong>Category:</strong>{" "}
              {product.category || "Livestock"}
            </p>

            {product.subCategory && (
              <p>
                <strong>Sub-category:</strong>{" "}
                {product.subCategory}
              </p>
            )}

            <p>
              <strong>Available Stock:</strong>{" "}
              {product.stockQuantity ?? 0}
            </p>

            <p>
              <strong>Unit:</strong>{" "}
              {product.unit || "Unit"}
            </p>

            {product.weightKg && (
              <p>
                <strong>Weight:</strong>{" "}
                {product.weightKg} kg
              </p>
            )}

            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {product.stockQuantity > 0
                  ? "Available"
                  : "Out of Stock"}
              </span>
            </p>

          </div>

          <div className="flex flex-col gap-4 mt-8">

            <button
              onClick={addToCart}
              disabled={!product.stockQuantity}
              className="bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.stockQuantity
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <Link
              to="/cart"
              className="border-2 border-green-700 text-green-700 py-4 rounded-xl text-center font-bold"
            >
              View Cart
            </Link>

            <a
              href="https://wa.me/2340000000000"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-green-700 text-green-700 py-4 rounded-xl text-center font-bold"
            >
              WhatsApp Seller
            </a>

          </div>

        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow p-6">

        <h2 className="text-3xl font-bold">
          Product Description
        </h2>

        <p className="mt-4 text-gray-600 leading-8 whitespace-pre-line">
          {product.description ||
            `${product.name} is a quality product available through MU'ADH AGROMART.`}
        </p>

      </div>

    </div>
  );
}

export default ProductDetails;
