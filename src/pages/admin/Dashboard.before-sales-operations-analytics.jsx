import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    customers: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    lowStock: 0,
    monthlySales: [],
    processingOrders: 0,
    outForDeliveryOrders: 0,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch {
      setUser(null);
    }

    const loadDashboard = async () => {
      try {
        const currentRole = storedUser
          ? JSON.parse(storedUser)?.role
          : null;

        // Sales Manager uses operational endpoints only.
        // CEO/GM continue using the protected dashboard endpoint.
        if (currentRole === "sales_manager") {
          const [ordersRes, productsRes] = await Promise.all([
            api.get("/orders"),
            api.get("/products"),
          ]);

          const ordersData =
            ordersRes.data?.orders ??
            ordersRes.data ??
            [];

          const productsData =
            productsRes.data?.products ??
            productsRes.data ??
            [];

          const orders = Array.isArray(ordersData)
            ? ordersData
            : [];

          const products = Array.isArray(productsData)
            ? productsData
            : [];

          const pendingOrders = orders.filter(
            (order) =>
              (order.status || order.orderStatus) ===
              "pending_payment"
          ).length;

          const processingOrders = orders.filter(
            (order) =>
              (order.status || order.orderStatus) ===
              "processing"
          ).length;

          const outForDeliveryOrders = orders.filter(
            (order) =>
              (order.status || order.orderStatus) ===
              "out_for_delivery"
          ).length;

          const deliveredOrders = orders.filter(
            (order) =>
              (order.status || order.orderStatus) ===
              "delivered"
          ).length;

          const lowStock = products.filter(
            (product) =>
              Number(product.stockQuantity ?? product.stock ?? 0) <= 5
          ).length;

          setStats({
            users: 0,
            customers: 0,
            products: products.length,
            orders: orders.length,
            revenue: 0,
            todayRevenue: 0,
            pendingOrders,
            deliveredOrders,
            lowStock,
            monthlySales: [],
            processingOrders,
            outForDeliveryOrders,
          });

          return;
        }

        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err);
      }
    };

    loadDashboard();
  }, []);

  const role = user?.role;

  const roleNames = {
    ceo: "CEO Dashboard",
    general_manager: "General Manager Dashboard",
    sales_manager: "Sales Manager Dashboard",
    staff: "Staff Dashboard",
  };

  const dashboardTitle = roleNames[role] || "Admin Dashboard";

  const canManageStaff = role === "ceo";

  const canManageOrders = [
    "ceo",
    "general_manager",
    "sales_manager",
  ].includes(role);

  const canManageProducts = [
    "ceo",
    "general_manager",
    "sales_manager",
    "staff",
  ].includes(role);

  const canAddProduct = [
    "ceo",
    "sales_manager",
    "staff",
  ].includes(role);

  const canApproveProducts = [
    "ceo",
    "general_manager",
  ].includes(role);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            {dashboardTitle}
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user?.fullName || user?.email || "Administrator"}.
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-8 flex gap-4 flex-wrap">

          {canManageProducts && (
            <Link
              to="/admin/products"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800"
            >
              Manage Products
            </Link>
          )}

          {canAddProduct && (
            <Link
              to="/admin/add-product"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800"
            >
              + Add Product
            </Link>
          )}

          {canManageOrders && (
            <Link
              to="/admin/orders"
              className="bg-purple-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-800"
            >
              Orders Management
            </Link>
          )}

          {canApproveProducts && (
            <Link
              to="/admin/pending-products"
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-700"
            >
              Pending Products
            </Link>
          )}

          {canManageStaff && (
            <Link
              to="/admin/staff"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900"
            >
              Manage Staff
            </Link>
          )}
        </div>

        {/* STATISTICS */}
        {role === "sales_manager" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Products</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.products || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Total Orders</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.orders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Pending Payment</h2>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.pendingOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Processing</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.processingOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Out for Delivery</h2>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.outForDeliveryOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Delivered Orders</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.deliveredOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Low Stock Products</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.lowStock || 0}
              </p>
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Users</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.users || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Total Customers</h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.customers || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Products</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.products || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Orders</h2>
              <p className="text-3xl font-bold mt-2">
                {stats.orders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Total Revenue</h2>
              <p className="text-3xl font-bold mt-2">
                ₦{(stats.revenue || 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Today's Revenue</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ₦{(stats.todayRevenue || 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Pending Orders</h2>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.pendingOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Delivered Orders</h2>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.deliveredOrders || 0}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-gray-600">Low Stock Products</h2>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.lowStock || 0}
              </p>
            </div>

          </div>
        )}

        {/* MONTHLY SALES */}
        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Sales Analytics
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stats.monthlySales || []}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#15803d"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
