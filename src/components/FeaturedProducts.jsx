function FeaturedProducts() {
  const products = [
    {
      image: "/hero-Ram.jpg",
      title: "Premium White Ram",
      price: "₦180,000",
    },
    {
      image: "/hero-Ram.jpg",
      title: "Healthy Ram",
      price: "₦170,000",
    },
    {
      image: "/hero-Ram.jpg",
      title: "Breeding Ram",
      price: "₦200,000",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700">
          Featured Livestock
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Carefully selected healthy livestock from MU'ADH Livestock Feed Farm Enterprise.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {products.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-green-700 font-bold text-lg mt-2">
                  {item.price}
                </p>

                <button className="mt-5 w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">
                  View Details
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
