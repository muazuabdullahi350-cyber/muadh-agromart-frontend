import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [userId] = useState(location.state?.userId || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        userId,
        otp,
      });

      localStorage.setItem("token", res.data.token);

      alert("Account verified successfully!");

      navigate("/");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        err.message ||
        "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-xl rounded-2xl p-8">

      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Verify Your Account
      </h1>

      <form onSubmit={handleVerify} className="space-y-5">

        <input
          type="text"
          value={userId}
          readOnly
          className="w-full border rounded-lg p-4 bg-gray-100"
        />

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-lg p-4"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-4 rounded-lg font-bold"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

      </form>

    </div>
  );
}

export default VerifyOtp;
