import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  // No login session
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Missing user information
  if (!user || !user.role) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Customers go back to marketplace
    if (user.role === "customer") {
      return <Navigate to="/marketplace" replace />;
    }

    // Other unauthorized staff go to dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
