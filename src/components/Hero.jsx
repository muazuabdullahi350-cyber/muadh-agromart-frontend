function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-900 to-green-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Nigeria's Trusted <span className="text-yellow-400">Livestock & Feed</span> Marketplace
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Buy healthy livestock directly from trusted farmers across Nigeria.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold">
              Browse Marketplace
            </button>

            <button className="border border-white px-6 py-3 rounded-lg">
              Contact on WhatsApp
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <img
            src="/hero-Ram.jpg"
            alt="Premium White Ram"
            className="rounded-3xl shadow-2xl w-full"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
