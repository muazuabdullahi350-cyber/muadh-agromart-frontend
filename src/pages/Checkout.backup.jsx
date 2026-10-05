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

  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
     e.preventDefault();

  const token = localStorage.getItem("token");

try {
  await api.post(
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
      paymentMethod: "paystack",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Order placed successfully!");
  navigate("/orders");
} catch (err) {
  console.error(err);
  alert("Failed to place order.");
}
};
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Checkout
      </h1>

      <form onSubmit={handleCheckout} className="space-y-4 bg-white p-6 rounded-xl shadow">

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

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg font-bold"
        >
          Continue to Payment
        </button>

      </form>
    </div>
  );
}

export default Checkout;
