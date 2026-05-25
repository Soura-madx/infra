import React, { useState } from "react";
import { Mail, Lock, LogIn, ShieldCheck, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isAdvisor, setIsAdvisor] = useState(true); // checkbox toggle
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    advisor_code: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ACCENT_ORANGE = "#f58025";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;

      if (isAdvisor) {
        // 🔥 Advisor Login API
        res = await axios.post("https://workiees.com/api/auth/advisor/login", {
          Advisor_code: formData.advisor_code,
          password: formData.password,
        });

        const advisor = res.data.data;

        // 🔥 Role detection using advisor_code
        let role = "advisor";
        if (advisor.Advisor_code?.toLowerCase().startsWith("admin")) {
          role = "admin";
        }

        // Save
        localStorage.setItem("token", advisor.token || "");
        localStorage.setItem("user", JSON.stringify(advisor));
        localStorage.setItem("userRole", role);

        // Redirect
        navigate(role === "admin" ? "/admin" : "/advisor");
      } else {
        // 🔥 User Login API (Admin)
        res = await axios.post("https://workiees.com/api/auth/user/login", {
          email: formData.email,
          password: formData.password,
        });

        const user = res.data.data;

        // Admin role
        localStorage.setItem("token", user.token || "");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userRole", "admin");

        navigate("/admin");
      }
    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001a2e] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <ShieldCheck size={32} style={{ color: ACCENT_ORANGE }} />
          <h2 className="text-2xl font-bold text-white mt-3">Login Portal</h2>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={isAdvisor}
            onChange={() => setIsAdvisor(!isAdvisor)}
          />
          <span className="text-white text-sm">
            {isAdvisor ? "Advisor Login" : "User Login"}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Advisor Code OR Email */}
          {isAdvisor ? (
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Advisor Code"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white"
                onChange={(e) =>
                  setFormData({ ...formData, advisor_code: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="email"
                placeholder="User Email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 text-white"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: ACCENT_ORANGE }}
            className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <LogIn size={18} />}
          </button>

          <span className="cursor-pointer text-white" onClick={() => navigate("/forgot-password")}>FORGOT?</span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
