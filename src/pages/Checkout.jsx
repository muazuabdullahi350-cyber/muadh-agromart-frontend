import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    lga: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  // MU'ADH AGROMART official WhatsApp number
  const WHATSAPP_NUMBER = "2349050419189";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/marketplace");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before placing your order.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/orders",
        {
          items: cartItems.map((item) => ({
            productId: item._id || item.id,
            quantity: item.quantity || 1,
          })),

          deliveryAddress: {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            address: form.address,
            state: form.state,
            lga: form.lga,
          },

          // Paystack will be added later.
          // For now, use bank transfer + WhatsApp confirmation.
          paymentMethod: "bank_transfer",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = res.data?.order;
      const payment = res.data?.payment;

      if (!order || !payment) {
        throw new Error(
          "Order was created but payment information was not returned."
        );
      }

      const amount = Number(
        payment.amount || order.totalAmount || 0
      );

      const whatsappMessage = `
MU'ADH AGROMART

Hello, I want to make payment for my order.

Order Number: ${order.orderNumber}
Payment Reference: ${payment.reference}
Amount: ₦${amount.toLocaleString()}

Customer Name: ${form.fullName}
Phone: ${form.phone}

I have placed this order and would like to complete payment by bank transfer.

Please provide the bank transfer payment instructions and verify my payment after I make the transfer.

Thank you.
      `.trim();

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(whatsappMessage)}`;

      // Clear cart only after order creation succeeds.
      localStorage.removeItem("cart");

      alert(
        `Order ${order.orderNumber} created successfully.\n\n` +
          `Amount: ₦${amount.toLocaleString()}\n\n` +
          `You will now be taken to WhatsApp to continue payment.`
      );

      window.location.href = whatsappUrl;
    } catch (err) {
      console.error("CHECKOUT ERROR:", err);

      alert(
        err.response?.data?.message ||
          err.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handleCheckout}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="4"
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="lga"
          placeholder="Local Government Area"
          value={form.lga}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* PAYMENT INFORMATION */}
        <div className="border rounded-xl p-5 bg-green-50">
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Payment
          </h2>

          <p className="text-gray-700">
            Pay by bank transfer and send your payment
            confirmation through WhatsApp.
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Your order will remain pending until MU'ADH AGROMART
            verifies your payment.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50"
        >
          {loading
            ? "Creating Order..."
            : "Place Order & Continue to WhatsApp"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
