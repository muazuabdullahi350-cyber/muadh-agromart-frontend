function Categories() {
  const categories = [
    "🐂 Cattle",
    "🐐 Goats",
    "🐑 Rams",
    "🐔 Poultry",
    "🌾 Animal Feed",
    "💉 Veterinary",
    "🚚 Transport",
    "🐪 Camels",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((item) => (
            <div
              key={item}
              className="bg-green-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
