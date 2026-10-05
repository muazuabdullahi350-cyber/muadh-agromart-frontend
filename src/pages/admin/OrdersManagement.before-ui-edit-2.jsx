import { useEffect, useState } from "react";
import api from "../../services/api";

  const [orders, setOrders] = useState([]);function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [notes, setNotes] = useState({});
  const [agents, setAgents] = useState({});

  // ==============================
  // LOAD ORDERS
  // ==============================
  const loadOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Support either:
      // { orders: [...] }
      // or directly [...]
      const data = res.data?.orders ?? res.data ?? [];

      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOAD ORDERS ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD ORDERS ON PAGE OPEN
  // ==============================
  useEffect(() => {
    loadOrders();
  }, []);

  // ==============================
  // CONFIRM PAYMENT MANUALLY
  // CEO confirms bank/manual payment
  // ==============================
  const confirmPayment = async (order) => {
    const confirmed = window.confirm(
      `Confirm that you have received ₦${Number(
        order.totalAmount || 0
      ).toLocaleString()} for Order #${order.orderNumber}?`
    );

    if (!confirmed) return;

    try {
      setUpdating(order._id);

      const token = localStorage.getItem("token");

      // Payment reference is generated when the order is created.
      const reference = `PAY-${order.orderNumber}`;

      await api.post(
        `/payments/${reference}/confirm-manual`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Payment confirmed successfully for Order #${order.orderNumber}.`
      );

      await loadOrders();
    } catch (err) {
      console.error("CONFIRM PAYMENT ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to confirm payment."
      );
    } finally {
      setUpdating(null);
    }
  };

  // ==============================
  // UPDATE ORDER STATUS
  // ==============================
  const updateStatus = async (order, newStatus) => {
    try {
      setUpdating(order._id);

      const token = localStorage.getItem("token");

      await api.patch(
        `/orders/${order._id}/status`,
        {
          status: newStatus,
          note: notes[order._id] || "",
          deliveryAgent: agents[order._id] || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Order #${order.orderNumber} updated successfully.`
      );

      setNotes((prev) => ({
        ...prev,
        [order._id]: "",
      }));

      await loadOrders();
    } catch (err) {
      console.error("UPDATE ORDER ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to update order status."
      );
    } finally {
      setUpdating(null);
    }
  };

  // ==============================
  // STATUS LABEL
  // ==============================
  const getStatusLabel = (status) => {
    const labels = {
      pending_payment: "Pending Payment",
      processing: "Processing",
      confirmed: "Confirmed",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };

    return labels[status] || status || "Unknown";
  };

  // ==============================
  // STATUS BADGE
  // ==============================
  const getStatusBadge = (status) => {
    const styles = {
      pending_payment:
        "bg-yellow-100 text-yellow-800",

      processing:
        "bg-blue-100 text-blue-800",

      confirmed:
        "bg-green-100 text-green-800",

      out_for_delivery:
        "bg-purple-100 text-purple-800",

      delivered:
        "bg-emerald-100 text-emerald-800",

      cancelled:
        "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          styles[status] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {getStatusLabel(status)}
      </span>
    );
  };

  // ==============================
  // LOADING SCREEN
  // ==============================
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-green-700 mb-8">
          Orders Management
        </h1>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN PAGE
  // ==============================
  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-green-700">
            Orders Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage orders, payments, delivery and tracking.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="bg-green-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-800"
        >
          Refresh Orders
        </button>
      </div>

      {/* NO ORDERS */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">
            No orders available.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-sm p-6"
            >

              {/* ==============================
                  ORDER HEADER
              ============================== */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order #{order.orderNumber}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    Customer:{" "}
                    <span className="font-semibold">
                      {order.customer?.name ||
                        order.customer?.fullName ||
                        "Unknown"}
                    </span>
                  </p>

                  {order.customer?.phone && (
                    <p className="text-gray-600">
                      Phone: {order.customer.phone}
                    </p>
                  )}
                </div>

                <div>
                  {getStatusBadge(order.status)}
                </div>

              </div>

              {/* ==============================
                  ORDER SUMMARY
              ============================== */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                {/* TOTAL */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="text-xl font-bold text-green-700">
                    ₦
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString()}
                  </p>
                </div>

                {/* PAYMENT */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Payment
                  </p>

                  <p
                    className={`font-semibold ${
                      order.paymentStatus === "paid"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus === "paid"
                      ? "Paid"
                      : "Pending Payment"}
                  </p>
                </div>

                {/* DATE */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Date
                  </p>

                  <p className="font-semibold">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

              </div>

              {/* ==============================
                  PAYMENT ACTION
              ============================== */}
              {order.paymentStatus !== "paid" &&
                order.status !== "cancelled" && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">

                    <h3 className="text-lg font-bold text-blue-900">
                      Payment Confirmation
                    </h3>

                    <p className="text-blue-800 mt-1">
                      Confirm this payment after you have verified
                      that the customer's money has been received.
                    </p>

                    <button
                      onClick={() =>
                        confirmPayment(order)
                      }
                      disabled={
                        updating === order._id
                      }
                      className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 disabled:opacity-50"
                    >
                      {updating === order._id
                        ? "Confirming Payment..."
                        : "Confirm Payment"}
                    </button>

                  </div>
                )}

              {/* ==============================
                  DELIVERY INFORMATION
              ============================== */}
              {order.deliveryAddress && (
                <div className="mt-6 border rounded-xl p-4">

                  <h3 className="font-bold text-lg mb-3">
                    Delivery Information
                  </h3>

                  <p>
                    <strong>Address:</strong>{" "}
                    {order.deliveryAddress.address ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {order.deliveryAddress.state ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>LGA:</strong>{" "}
                    {order.deliveryAddress.lga ||
                      "N/A"}
                  </p>

                </div>
              )}

              {/* ==============================
                  ORDER STATUS CONTROL
              ============================== */}
              <div className="mt-6 border-t pt-6">

                <h3 className="text-lg font-bold mb-4">
                  Update Order
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* STATUS */}
                  <div>
                    <label className="block font-semibold mb-2">
                      New Status
                    </label>

                    <select
                      value={
                        order.status ||
                        "pending_payment"
                      }
                      disabled={
                        updating === order._id
                      }
                      onChange={(e) =>
                        updateStatus(
                          order,
                          e.target.value
                        )
                      }
                      className="w-full border rounded-lg px-4 py-3 bg-white"
                    >

                      <option value="pending_payment">
                        Pending Payment
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="out_for_delivery">
                        Out for Delivery
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>

                    </select>
                  </div>

                  {/* DELIVERY AGENT */}
                  <div>
                    <label className="block font-semibold mb-2">
                      Delivery Agent
                    </label>

                    <input
                      type="text"
                      value={
                        agents[order._id] || ""
                      }
                      onChange={(e) =>
                        setAgents((prev) => ({
                          ...prev,
                          [order._id]:
                            e.target.value,
                        }))
                      }
                      placeholder="e.g. Musa Ibrahim"
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>

                </div>

                {/* TRACKING NOTE */}
                <div className="mt-4">

                  <label className="block font-semibold mb-2">
                    Tracking Note
                  </label>

                  <textarea
                    value={
                      notes[order._id] || ""
                    }
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [order._id]:
                          e.target.value,
                      }))
                    }
                    rows="3"
                    placeholder="Example: Your order has been confirmed and is being prepared for delivery."
                    className="w-full border rounded-lg px-4 py-3"
                  />

                </div>

                {/* SAVE BUTTON */}
                <button
                  onClick={() =>
                    updateStatus(
                      order,
                      order.status
                    )
                  }
                  disabled={
                    updating === order._id
                  }
                  className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50"
                >
                  {updating === order._id
                    ? "Updating..."
                    : "Save Tracking Update"}
                </button>

              </div>

              {/* ==============================
                  TRACKING HISTORY
              ============================== */}
              {order.trackingUpdates &&
                order.trackingUpdates.length > 0 && (

                  <div className="mt-8 border-t pt-6">

                    <h3 className="text-xl font-bold mb-5">
                      Tracking History
                    </h3>

                    <div className="space-y-4">

                      {[
                        ...order.trackingUpdates,
                      ]
                        .reverse()
                        .map((update, index) => (

                          <div
                            key={`${order._id}-${index}`}
                            className="border-l-4 border-green-600 bg-green-50 rounded-r-xl p-4"
                          >

                            <div className="flex flex-col md:flex-row md:justify-between gap-2">

                              <p className="font-bold text-green-800">
                                {getStatusLabel(
                                  update.status
                                )}
                              </p>

                              {update.createdAt && (
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    update.createdAt
                                  ).toLocaleString()}
                                </p>
                              )}

                            </div>

                            {update.note && (
                              <p className="mt-2 text-gray-700">
                                {update.note}
                              </p>
                            )}

                            {update.deliveryAgent && (
                              <p className="mt-2 text-sm text-gray-600">
                                <strong>
                                  Delivery Agent:
                                </strong>{" "}
                                {update.deliveryAgent}
                              </p>
                            )}

                          </div>

                        ))}

                    </div>

                  </div>

                )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default OrdersManagement;
