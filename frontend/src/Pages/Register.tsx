import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../api/clients";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/register", { email, username, password });
      localStorage.setItem("aet_token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#0F0D1A]/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        <h2 className="font-serif text-3xl font-medium text-[#EDE9F8] text-center mb-2">
          Create Account
        </h2>
        <p className="text-[#A89EC0] text-sm text-center mb-6">
          Start tracking celestial events in real-time
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#A89EC0] uppercase tracking-wider mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="stargazer"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#EDE9F8] placeholder-[#6E6785] focus:outline-none focus:border-[#A78BFA] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A89EC0] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#EDE9F8] placeholder-[#6E6785] focus:outline-none focus:border-[#A78BFA] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A89EC0] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#EDE9F8] placeholder-[#6E6785] focus:outline-none focus:border-[#A78BFA] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#6B4FD8] hover:bg-[#A78BFA] text-white font-medium rounded-xl transition-all shadow-lg shadow-[#6B4FD8]/20 mt-3 cursor-pointer"
          >
            Create Free Account
          </button>
        </form>

        <p className="text-center text-sm text-[#A89EC0] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#A78BFA] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};