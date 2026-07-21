function Stats() {
  const stats = [
    { number: "500+", title: "Livestock Sold" },
    { number: "1,000+", title: "Happy Customers" },
    { number: "36", title: "States Served" },
    { number: "99%", title: "Customer Satisfaction" },
  ];

  return (
    <section className="bg-green-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our Impact
        </h2>

        <p className="text-center mt-3 text-green-100">
          Growing agriculture with trust, quality and excellence.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {stats.map((item, index) => (
            <div key={index} className="text-center">

              <h3 className="text-5xl font-extrabold">
                {item.number}
              </h3>

              <p className="mt-3 text-lg">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;
