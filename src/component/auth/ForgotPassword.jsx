import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    new_password: "",
  });

  const navigate = useNavigate();

  const API_BASE = "https://workiees.com/api";

  // 🔥 STEP 1: REQUEST OTP
  const requestOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/password/forgot`, {
        email: form.email,
      });

      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STEP 2: VERIFY OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/password/verify-otp`, {
        email: form.email,
        otp: form.otp,
      });

      alert(res.data.message);
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STEP 3: RESET PASSWORD
  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/password/reset`, {
        email: form.email,
        otp: form.otp,
        new_password: form.new_password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001a2e] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2rem] p-8 shadow-2xl text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 p-3 rounded-lg bg-white/10 outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <button
              onClick={requestOtp}
              disabled={loading}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <div className="relative mb-4">
              <KeyRound className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full pl-10 p-3 rounded-lg bg-white/10 outline-none"
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value })
                }
              />
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                className="w-full pl-10 p-3 rounded-lg bg-white/10 outline-none"
                onChange={(e) =>
                  setForm({ ...form, new_password: e.target.value })
                }
              />
            </div>

            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Back to Login */}
        <p
          className="text-center mt-4 text-sm cursor-pointer text-gray-400"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;