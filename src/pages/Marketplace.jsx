function Marketplace() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-green-700">
        Livestock Marketplace
      </h1>

      <p className="mt-4 text-gray-600">
        Browse healthy livestock, animal feed, veterinary products, and farm services.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🐂
          <h2 className="mt-3 font-bold">Cattle</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🐐
          <h2 className="mt-3 font-bold">Goats</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🐑
          <h2 className="mt-3 font-bold">Rams</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          🌾
          <h2 className="mt-3 font-bold">Animal Feed</h2>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
