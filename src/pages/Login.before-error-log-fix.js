import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error("Login response is missing authentication details.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`Welcome back, ${user.fullName || user.email}!`);

      // Redirect according to the user's role
      switch (user.role) {
        case "ceo":
        case "general_manager":
        case "sales_manager":
        case "staff":
          navigate("/admin/dashboard");
          break;

        case "customer":
          navigate("/marketplace");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed.");

      alert(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Login to MU'ADH AGROMART
      </h1>

      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="text"
          name="identifier"
          placeholder="Email or Phone Number"
          value={form.identifier}
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
          className="w-full bg-green-700 text-white py-4 rounded-lg font-bold"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
