import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function TrackOrder() {
  const { id } = useParams();

  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTracking = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/orders/${id}/track`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTracking(res.data);
      } catch (err) {
        console.error("TRACK ORDER ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load order tracking."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTracking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-green-700">
          Loading order tracking...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-red-600">
            Tracking Unavailable
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <Link
            to="/my-orders"
            className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const status = tracking?.status || "pending_payment";
  const updates = tracking?.trackingUpdates || [];

  const steps = [
    {
      key: "pending_payment",
      title: "Payment Pending",
      description: "Waiting for payment confirmation.",
    },
    {
      key: "processing",
      title: "Processing",
      description: "Your order is being prepared.",
    },
    {
      key: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been confirmed.",
    },
    {
      key: "out_for_delivery",
      title: "Out for Delivery",
      description: "Your order is on the way.",
    },
    {
      key: "delivered",
      title: "Delivered",
      description: "Your order has been delivered.",
    },
  ];

  const statusIndex = steps.findIndex(
    (step) => step.key === status
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/my-orders"
          className="text-green-700 font-semibold"
        >
          ← Back to My Orders
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-gray-500">
                Order Tracking
              </p>

              <h1 className="text-3xl font-bold text-gray-900 mt-1">
                #{id.slice(-8).toUpperCase()}
              </h1>
            </div>

            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold capitalize">
              {status.replaceAll("_", " ")}
            </span>

          </div>

          {/* TRACKING STEPS */}

          <div className="mt-10">

            {steps.map((step, index) => {

              const completed =
                statusIndex >= index && status !== "cancelled";

              return (
                <div
                  key={step.key}
                  className="flex gap-4 relative"
                >

                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-4 top-9 w-1 h-16 ${
                        statusIndex > index
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      completed
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <div className="pb-10">
                    <h2
                      className={`font-bold ${
                        completed
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

          {/* DELIVERY AGENT */}

          {tracking?.deliveryAgent && (
            <div className="mt-4 bg-green-50 rounded-xl p-5">
              <h2 className="font-bold text-green-800">
                Delivery Agent
              </h2>

              <p className="mt-2 text-gray-700">
                {tracking.deliveryAgent.name ||
                  "Assigned delivery agent"}
              </p>

              {tracking.deliveryAgent.phone && (
                <p className="text-gray-600">
                  {tracking.deliveryAgent.phone}
                </p>
              )}
            </div>
          )}

          {/* TRACKING HISTORY */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold">
              Tracking History
            </h2>

            {updates.length === 0 ? (
              <p className="text-gray-500 mt-4">
                No tracking updates yet.
              </p>
            ) : (
              <div className="mt-4 space-y-4">

                {[...updates]
                  .reverse()
                  .map((update, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-600 bg-gray-50 rounded-r-xl p-4"
                    >
                      <p className="font-bold text-green-700 capitalize">
                        {update.status?.replaceAll(
                          "_",
                          " "
                        )}
                      </p>

                      {update.note && (
                        <p className="text-gray-700 mt-1">
                          {update.note}
                        </p>
                      )}

                      {update.createdAt && (
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(
                            update.createdAt
                          ).toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
