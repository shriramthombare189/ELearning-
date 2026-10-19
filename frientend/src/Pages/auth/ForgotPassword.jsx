import React, { useEffect, useState } from "react";

export default function ForgotPassword() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-4">
      
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full 
          bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 
          opacity-30 blur-[120px] animate-pulseSlow" />

        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full 
          bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 
          opacity-25 blur-[100px] animate-pulseSlow delay-1000" />
      </div>

      {/* Card */}
      <div
        className={`
          relative z-10 w-full max-w-md rounded-2xl
          bg-white/5 backdrop-blur-xl border border-white/10
          shadow-2xl px-8 py-10
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="text-3xl font-semibold text-center 
          bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          Forgot Password
        </h2>

        <p className="mt-2 text-center text-gray-400 text-sm">
          We’ll send you a password reset link
        </p>

        {/* Form */}
        <form className="mt-8 space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                w-full rounded-xl px-4 py-3
                bg-black/40 border border-white/10
                text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                transition
              "
            />
          </div>

          {/* Button */}
          <button
            className="
              w-full py-3 rounded-full
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
              text-black font-semibold
              hover:opacity-90 transition
              shadow-lg shadow-cyan-500/30
            "
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2 text-sm text-gray-400">
          <p>
            Remember your password?{" "}
            <a href="/login" className="text-cyan-400 hover:underline">
              Login
            </a>
          </p>
          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-cyan-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
