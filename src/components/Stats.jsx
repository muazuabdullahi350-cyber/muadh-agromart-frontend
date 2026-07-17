function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Livestock Sold",
    },
    {
      number: "1,000+",
      title: "Happy Customers",
    },
    {
      number: "36",
      title: "States Reached",
    },
    {
      number: "99%",
      title: "Customer Satisfaction",
    },
  ];

  return (
    <section
      style={{
        background: "#0f5132",
        color: "white",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <h2>Our Impact</h2>
      <p>Growing agriculture with trust and excellence.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {stats.map((item, index) => (
          <div key={index}>
            <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
              {item.number}
            </h1>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
