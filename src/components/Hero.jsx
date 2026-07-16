function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-900 via-green-700 to-green-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          Working with Nature,
          <br />
          Trading with Trust.
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
          Buy healthy livestock, premium animal feed, veterinary products,
          and farm services from Nigeria's trusted livestock marketplace.
        </p>

        <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition">
            Browse Marketplace
          </button>

          <button className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-900 transition">
            Request Livestock
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
