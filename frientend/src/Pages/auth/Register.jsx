import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // ================= STATE =================
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= EFFECT =================
  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setErrorMsg("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // ---------- VALIDATION ----------
    if (!formData.fullName.trim()) {
      setErrorMsg("Full name is required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setErrorMsg("Email is required");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setErrorMsg("Password is required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match");
      setLoading(false);
      return;
    }

    // ---------- API CALL ----------
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json(); // ✅ always JSON

      // ---------- ERROR ----------
      if (!response.ok || result.success === false) {
        setErrorMsg(result.error || "Registration failed");
        return;
      }

      // ---------- SUCCESS ----------
      const user = result.data;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: user.id,
          name: user.fullName,
          email: user.email,
        })
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");

    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 opacity-25 blur-[100px]" />
      </div>

      {/* Register Card */}
      <div
        className={`
          relative z-10 w-full max-w-md rounded-2xl
          bg-white/5 backdrop-blur-xl border border-white/10
          shadow-2xl px-8 py-10
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="text-3xl font-semibold text-center">Create Account</h2>
        <p className="mt-2 text-center text-gray-400 text-sm">
          Start your learning journey 🚀
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {errorMsg && (
          <p className="mt-4 text-center text-sm text-red-500">{errorMsg}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
