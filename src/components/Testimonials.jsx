function Testimonials() {
  const testimonials = [
    {
      name: "Musa Ibrahim",
      location: "Kano",
      message:
        "Excellent service. The livestock arrived healthy and exactly as described.",
    },
    {
      name: "Aisha Bello",
      location: "Abuja",
      message:
        "MU'ADH AGROMART made buying livestock easy and trustworthy.",
    },
    {
      name: "Usman Ali",
      location: "Maiduguri",
      message:
        "Professional customer service and quality animal feed. Highly recommended!",
    },
  ];

  return (
    <section style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2>What Our Customers Say</h2>
      <p>Trusted by livestock farmers and traders.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "24px" }}>⭐⭐⭐⭐⭐</div>

            <p style={{ margin: "20px 0" }}>
              "{item.message}"
            </p>

            <h3>{item.name}</h3>

            <small>{item.location}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
