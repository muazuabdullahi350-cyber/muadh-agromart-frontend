import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [tracking, setTracking] = useState(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders || res.data || []);
    } catch (err) {
      console.error("LOAD ORDERS ERROR:", err);
    }
  };

  const trackOrder = async (orderId) => {
    try {
      setLoadingTracking(true);

      const token = localStorage.getItem("token");

      const res = await api.get(`/orders/${orderId}/track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTracking({
        orderId,
        status: res.data.status,
        trackingUpdates: res.data.trackingUpdates || [],
      });
    } catch (err) {
      console.error("TRACK ORDER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to load tracking information."
      );
    } finally {
      setLoadingTracking(false);
    }
  };

  const getStatusLabel = (status) => {
    return String(status || "pending_payment")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending_payment":
        return "💳";

      case "processing":
        return "📦";

      case "confirmed":
        return "✅";

      case "out_for_delivery":
        return "🚚";

      case "delivered":
        return "🎉";

      case "cancelled":
        return "❌";

      default:
        return "📍";
    }
  };

  const money = (amount) =>
    `₦${Number(amount || 0).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700 mb-2">
          My Orders
        </h1>

        <p className="text-gray-600 mb-8">
          View and track all your MU'ADH AGROMART orders.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-2xl font-bold mb-2">
              No orders yet
            </h2>

            <p className="text-gray-500">
              Your orders will appear here after you make a purchase.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-md p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order Number
                    </p>

                    <h2 className="text-xl font-bold text-gray-900">
                      #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
                    </h2>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span className="inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold">
                      {getStatusIcon(order.status || order.orderStatus)}

                      {getStatusLabel(
                        order.status || order.orderStatus
                      )}
                    </span>
                  </div>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-6">

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-green-700">
                      {money(order.totalAmount)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-semibold">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold">
  {order.paymentStatus === "paid"
    ? "Paid"
    : order.paymentStatus === "failed"
    ? "Payment Failed"
    : "Pending Payment"}
</p>
                  </div>

                </div>

                <button
                  onClick={() => trackOrder(order._id)}
                  className="mt-6 w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  {loadingTracking && tracking?.orderId === order._id
                    ? "Loading..."
                    : "📍 Track Order"}
                </button>

                {tracking?.orderId === order._id && (
                  <div className="mt-6 border-t pt-6">

                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Order Tracking
                    </h3>

                    {tracking.trackingUpdates.length === 0 ? (
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-gray-600">
                          Your order has been received.
                          Tracking updates will appear here as our team
                          processes your order.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-5">

                        {tracking.trackingUpdates.map(
                          (update, index) => (
                            <div
                              key={index}
                              className="flex gap-4"
                            >

                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                                  {getStatusIcon(update.status)}
                                </div>

                                {index <
                                  tracking.trackingUpdates.length - 1 && (
                                  <div className="w-1 bg-green-200 flex-1 mt-2" />
                                )}
                              </div>

                              <div className="pb-5">
                                <h4 className="font-bold text-lg">
                                  {getStatusLabel(update.status)}
                                </h4>

                                {update.note && (
                                  <p className="text-gray-600 mt-1">
                                    {update.note}
                                  </p>
                                )}

                                {update.createdAt && (
                                  <p className="text-sm text-gray-400 mt-2">
                                    {new Date(
                                      update.createdAt
                                    ).toLocaleString()}
                                  </p>
                                )}
                              </div>

                            </div>
                          )
                        )}

                      </div>
                    )}

                    <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
                      <p className="text-sm text-green-700">
                        Current Status
                      </p>

                      <p className="text-xl font-bold text-green-800 mt-1">
                        {getStatusIcon(tracking.status)}{" "}
                        {getStatusLabel(tracking.status)}
                      </p>
                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyOrders;
