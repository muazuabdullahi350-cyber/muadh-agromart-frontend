function Categories() {
  const categories = [
    { icon: "🐂", name: "Cattle" },
    { icon: "🐐", name: "Goats" },
    { icon: "🐑", name: "Rams" },
    { icon: "🐔", name: "Poultry" },
    { icon: "🌾", name: "Animal Feed" },
    { icon: "💉", name: "Veterinary" },
    { icon: "🚚", name: "Transport" },
    { icon: "🧑‍🌾", name: "Farm Services" },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700">
          Shop by Category
        </h2>

        <p className="text-center text-gray-600 mt-3">
          Find everything you need for your livestock business.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">

          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition duration-300 cursor-pointer"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="mt-4 font-bold text-lg">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;
