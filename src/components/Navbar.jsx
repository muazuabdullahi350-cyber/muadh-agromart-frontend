import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const isLoggedIn = Boolean(token && user);

  const isAdmin =
    user &&
    ["ceo", "general_manager", "sales_manager", "staff"].includes(
      user.role
    );

  const isCEO = user?.role === "ceo";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("You have been logged out.");

    navigate("/login");
  };

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-4">

        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* BRAND */}
          <Link
            to="/"
            className="text-2xl font-bold"
          >
            MU'ADH AGROMART
          </Link>

          {/* NAVIGATION */}
          <div className="flex flex-wrap justify-center gap-5 mt-4 md:mt-0 items-center">

            <Link to="/">
              Home
            </Link>

            <Link to="/marketplace">
              Marketplace
            </Link>

            {isLoggedIn && user?.role === "customer" && (
              <>
                <Link to="/cart">
                  Cart
                </Link>

                <Link to="/orders">
                  My Orders
                </Link>
              </>
            )}

            {/* ADMIN NAVIGATION */}
            {isAdmin && (
              <>
                <Link to="/admin/dashboard">
                  Dashboard
                </Link>

                <Link to="/admin/products">
                  Products
                </Link>
              </>
            )}

            {/* ORDER MANAGEMENT */}
            {isAdmin &&
              ["ceo", "general_manager", "sales_manager"].includes(
                user.role
              ) && (
                <Link to="/admin/orders">
                  Orders Management
                </Link>
              )}

            {/* CEO ONLY */}
            {isCEO && (
              <Link to="/admin/staff">
                Staff Management
              </Link>
            )}

            <Link to="/about">
              About
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            {/* AUTH */}
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link to="/register">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="font-semibold">
                  {user?.fullName || user?.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
