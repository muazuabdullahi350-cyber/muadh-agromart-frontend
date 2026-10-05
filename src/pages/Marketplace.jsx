import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Products" },
  { value: "livestock", label: "Livestock" },
  { value: "feed", label: "Animal Feed" },
  { value: "medication", label: "Animal Medication" },
  { value: "equipment", label: "Farm Equipment" },
];

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [cartMessage, setCartMessage] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to load marketplace products.");
      setError(
        err.response?.data?.message ||
          "We couldn't load the marketplace right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = (product) => {
    if (!product.stockQuantity || product.stockQuantity <= 0) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      if (existing.quantity >= product.stockQuantity) {
        setCartMessage(`Only ${product.stockQuantity} available.`);
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

    setCartMessage(`${product.name} added to your cart.`);

    window.setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        product.category?.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sort === "price-high") {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      if (sort === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [products, search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              MU'ADH AGROMART
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Your Dependable Livestock & Feed Partner
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-green-50 sm:text-lg">
              Shop verified livestock, quality animal feed and selected
              agricultural products from MU'ADH AGROMART.
            </p>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-[1fr_220px_190px_auto]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search livestock, feed..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-green-600"
              aria-label="Filter by category"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-green-600"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-green-700 px-5 py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* Main marketplace */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {cartMessage && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-800"
          >
            {cartMessage}
          </div>
        )}

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Marketplace
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading available products..."
                : `${filteredProducts.length} product${
                    filteredProducts.length === 1 ? "" : "s"
                  } found`}
            </p>
          </div>

          {!loading && products.length > 0 && (
            <Link
              to="/cart"
              className="font-semibold text-green-700 hover:text-green-900"
            >
              View Cart →
            </Link>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-56 animate-pulse bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* API error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
              !
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Marketplace temporarily unavailable
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty / no results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 text-5xl">🐄</div>

            <h3 className="text-xl font-bold text-slate-900">
              {products.length === 0
                ? "No products available yet"
                : "No products match your search"}
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-slate-500">
              {products.length === 0
                ? "Our marketplace is being updated. Please check back soon."
                : "Try another search or clear the filters to see more products."}
            </p>

            {products.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const stock = Number(product.stockQuantity || 0);
              const isInStock = stock > 0;

              return (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="block overflow-hidden bg-slate-100"
                  >
                    <img
                      src={
                        product.images?.[0] ||
                        "https://picsum.photos/600/450"
                      }
                      alt={product.name}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold capitalize text-green-700">
                        {product.category || "Agriculture"}
                      </span>

                      <span
                        className={`text-xs font-semibold ${
                          isInStock ? "text-green-700" : "text-red-600"
                        }`}
                      >
                        {isInStock ? `${stock} available` : "Out of stock"}
                      </span>
                    </div>

                    <Link to={`/product/${product._id}`}>
                      <h3 className="line-clamp-2 min-h-14 text-lg font-bold text-slate-900 transition hover:text-green-700">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-2 text-2xl font-extrabold text-green-700">
                      ₦{Number(product.price || 0).toLocaleString()}
                    </p>

                    {product.weightKg && (
                      <p className="mt-1 text-sm text-slate-500">
                        Weight: {product.weightKg} kg
                      </p>
                    )}

                    <div className="mt-5 grid gap-2">
                      <Link
                        to={`/product/${product._id}`}
                        className="rounded-xl border border-green-700 px-4 py-3 text-center font-semibold text-green-700 transition hover:bg-green-50"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        disabled={!isInStock}
                        className="rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {isInStock ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Marketplace;
