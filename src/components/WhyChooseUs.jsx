function WhyChooseUs() {
  const features = [
    {
      title: "Healthy Livestock",
      text: "Every animal is carefully selected to ensure quality and good health.",
    },
    {
      title: "Nationwide Delivery",
      text: "We transport livestock safely to customers across Nigeria.",
    },
    {
      title: "Trusted Business",
      text: "MU'ADH Livestock Feed Farm Enterprise is committed to honesty and excellence.",
    },
    {
      title: "Expert Support",
      text: "Get professional guidance on livestock, feed, and farm management.",
    },
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-700">
          Why Choose MU'ADH?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold text-green-700">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
