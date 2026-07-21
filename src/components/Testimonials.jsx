function Testimonials() {
  const testimonials = [
    {
      name: "Musa Ibrahim",
      location: "Kano",
      comment:
        "Excellent service. The livestock arrived healthy and exactly as described.",
    },
    {
      name: "Aisha Bello",
      location: "Abuja",
      comment:
        "MU'ADH Livestock Feed Farm Enterprise made buying livestock easy and trustworthy.",
    },
    {
      name: "Usman Ali",
      location: "Maiduguri",
      comment:
        "Professional customer service and quality animal feed. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-5 italic text-gray-600">
                "{item.comment}"
              </p>

              <h3 className="mt-6 font-bold text-lg">
                {item.name}
              </h3>

              <p className="text-gray-500">
                {item.location}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;
