function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-green-500">
            MU'ADH Livestock Feed Farm Enterprise
          </h2>

          <p className="mt-4 text-gray-400">
            Working With Nature.
          </p>

          <p className="mt-2 text-gray-400">
            Your Dependable Livestock & Feed Partner.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Marketplace</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Cattle</li>
            <li>Goats</li>
            <li>Rams</li>
            <li>Poultry</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Services</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Animal Feed</li>
            <li>Veterinary</li>
            <li>Transportation</li>
            <li>Farm Consultation</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Contact</h3>

          <p className="text-gray-400">
            Maiduguri Cattle Market,
            Maiduguri, Borno State.
          </p>

          <button className="mt-5 bg-green-700 px-5 py-3 rounded-lg">
            WhatsApp Us
          </button>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 MU'ADH Livestock Feed Farm Enterprise.
        All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
