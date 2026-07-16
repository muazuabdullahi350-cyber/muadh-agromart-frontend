function Navbar() {
  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          MU'ADH AGROMART
        </h1>

        <div className="hidden md:flex gap-6">
          <a href="#" className="hover:text-yellow-300">Home</a>
          <a href="#" className="hover:text-yellow-300">Marketplace</a>
          <a href="#" className="hover:text-yellow-300">Services</a>
          <a href="#" className="hover:text-yellow-300">Blog</a>
          <a href="#" className="hover:text-yellow-300">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
