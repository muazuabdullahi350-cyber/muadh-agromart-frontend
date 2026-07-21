function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="MU'ADH Livestock Feed Farm Enterprise"
            className="w-14 h-14 rounded-full"
          />

          <div>
            <h1 className="text-lg font-bold text-green-700">
              MU'ADH Livestock Feed Farm Enterprise
            </h1>

            <p className="text-xs text-gray-500">
              Working With Nature
            </p>
          </div>
        </div>

        {/* Menu */}
        <ul className="hidden lg:flex gap-8 font-medium">
          <li><a href="#">Home</a></li>
          <li><a href="#">Marketplace</a></li>
          <li><a href="#">Livestock</a></li>
          <li><a href="#">Animal Feed</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>

        {/* Buttons */}
        <div className="hidden lg:flex gap-3">
          <button className="bg-green-700 text-white px-5 py-2 rounded-lg">
            Login
          </button>

          <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg">
            WhatsApp
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
