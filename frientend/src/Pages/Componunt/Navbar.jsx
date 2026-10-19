import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ LOGIN CHECK
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);
  }, []);

  // 🔹 Scroll helper
  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setOpen(false);
  };

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Learning<span className="text-blue-500">Platform</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => handleNavClick("home")} className="hover:text-blue-400">Home</button>
            <button onClick={() => handleNavClick("courses")} className="hover:text-blue-400">Courses</button>
            <button onClick={() => handleNavClick("about")} className="hover:text-blue-400">About</button>
            <button onClick={() => handleNavClick("contact")} className="hover:text-blue-400">Contact</button>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-1 border border-gray-500 rounded"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-4 py-1 bg-blue-600 rounded"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="px-4 py-1 bg-blue-600 rounded"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <button onClick={() => handleNavClick("home")}>Home</button>
            <button onClick={() => handleNavClick("courses")}>Courses</button>
            <button onClick={() => handleNavClick("about")}>About</button>
            <button onClick={() => handleNavClick("contact")}>Contact</button>

            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Sign Up</button>
              </>
            ) : (
              <button
                className="bg-blue-600 py-2 rounded"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
