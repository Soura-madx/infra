
import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterAdvisor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const PRIMARY_BLUE = "#005596";
  const ACCENT_ORANGE = "#f58025";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend automatically sets role to 'advisor' if not sent as 'admin'
      const res = await axios.post('http://localhost:1000/auth/register', formData);
        // save data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    navigate("/login");
      // Redirect to login or dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#001a2e] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight">Join the Team</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Register as a Prarambh Infra Advisor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#f58025] outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="email"
              placeholder="Corporate Email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#f58025] outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              placeholder="Create Password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#f58025] outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Role Info Note */}
          <div className="bg-[#005596]/10 border border-[#005596]/20 rounded-xl p-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Note: You are registering as a <span className="text-white">Default Advisor</span>. 
              Admin privileges must be granted by the System Administrator.
            </p>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: ACCENT_ORANGE }}
            className="group w-full py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Register Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-slate-500 font-medium">
          Already have an account? <span className="text-[#005596] cursor-pointer hover:underline">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdvisor;