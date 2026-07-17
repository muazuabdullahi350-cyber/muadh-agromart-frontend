function WhyChooseUs() {
  const features = [
    {
      title: "Healthy Livestock",
      icon: "🐂",
      description: "We provide healthy and carefully selected livestock."
    },
    {
      title: "Trusted Marketplace",
      icon: "🤝",
      description: "Connecting farmers, traders, and buyers with confidence."
    },
    {
      title: "Fast Delivery",
      icon: "🚚",
      description: "Reliable livestock transportation across Nigeria."
    },
    {
      title: "Expert Support",
      icon: "💉",
      description: "Professional farm consultation and veterinary guidance."
    }
  ];

  return (
    <section style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2>Why Choose MU'ADH AGROMART?</h2>
      <p>Your dependable livestock and feed partner.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "50px" }}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
