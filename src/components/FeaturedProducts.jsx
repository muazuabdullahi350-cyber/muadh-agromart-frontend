function FeaturedProducts() {
  const products = [
    {
      name: "Healthy Cattle",
      price: "₦850,000",
      image: "🐂",
    },
    {
      name: "Premium Rams",
      price: "₦180,000",
      image: "🐑",
    },
    {
      name: "Healthy Goats",
      price: "₦95,000",
      image: "🐐",
    },
    {
      name: "Animal Feed",
      price: "Available",
      image: "🌾",
    },
  ];

  return (
    <section style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2>Featured Products</h2>
      <p>Quality livestock and farm products from MU'ADH AGROMART.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "60px" }}>{product.image}</div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
