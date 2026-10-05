import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Submitting form:", form);

      const res = await api.post("/auth/register", form);

      console.log("Response:", res.data);

      alert("Registration successful!");

      navigate("/verify-otp", {
        state: {
          userId: res.data.userId,
        },
      });
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Create MU'ADH AGROMART Account
      </h1>

      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-4"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-4 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default Register;
