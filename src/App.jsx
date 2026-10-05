import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import TrackOrder from "./pages/TrackOrder";

import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ProductApproval from "./pages/admin/ProductApproval";
import PendingProducts from "./pages/admin/PendingProducts";
import StaffManagement from "./pages/admin/StaffManagement";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* CUSTOMER */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id/track"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <TrackOrder />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "general_manager",
                "sales_manager",
                "staff",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PRODUCTS */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "general_manager",
                "sales_manager",
                "staff",
              ]}
            >
              <ProductsManagement />
            </ProtectedRoute>
          }
        />

        {/* ADD PRODUCT */}
        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "sales_manager",
                "staff",
              ]}
            >
              <AddProduct />
            </ProtectedRoute>
          }
        />

        {/* ORDERS MANAGEMENT */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "general_manager",
                "sales_manager",
              ]}
            >
              <OrdersManagement />
            </ProtectedRoute>
          }
        />

        {/* PENDING PRODUCTS */}
        <Route
          path="/admin/pending-products"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "general_manager",
              ]}
            >
              <PendingProducts />
            </ProtectedRoute>
          }
        />

        {/* PRODUCT APPROVAL */}
        <Route
          path="/admin/product-approval"
          element={
            <ProtectedRoute
              allowedRoles={[
                "ceo",
                "general_manager",
              ]}
            >
              <ProductApproval />
            </ProtectedRoute>
          }
        />

        {/* STAFF MANAGEMENT — CEO ONLY */}
        <Route
          path="/admin/staff"
          element={
            <ProtectedRoute allowedRoles={["ceo"]}>
              <StaffManagement />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

function NavigateToHome() {
  window.location.href = "/";
  return null;
}

export default App;
