import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Animation
  const [show, setShow] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI State
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  // 🔐 ADMIN LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid Email ID");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Invalid Email or Password");
      }

      const data = await response.json();

      // ✅ Save Admin Session
      localStorage.setItem(
        "admin",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: "ADMIN",
        })
      );

      // ✅ Redirect to Admin Dashboard
      navigate("/admin");

    } catch (err) {
      setErrorMessage(err.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      
      {/* 🌈 Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full 
          bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 
          opacity-30 blur-[120px] animate-pulse" />

        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full 
          bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 
          opacity-25 blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* 🧾 Login Card */}
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-2xl px-8 py-10 transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          Admin Login
        </h2>

        <p className="mt-2 text-center text-gray-400 text-sm">
          Login to access Admin Dashboard 🔐
        </p>

        {/* 📋 Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Email ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10
              text-white placeholder-gray-500 focus:outline-none
              focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10
              text-white placeholder-gray-500 focus:outline-none
              focus:ring-2 focus:ring-purple-500/50"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
            text-black font-semibold hover:opacity-90 transition
            shadow-lg shadow-cyan-500/30 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ❌ Error */}
        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
