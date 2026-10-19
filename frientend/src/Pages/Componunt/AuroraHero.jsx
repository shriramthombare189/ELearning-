import React, { useEffect, useState } from "react";

export default function AuroraHero() {
  const [show, setShow] = useState(false);

  // API data state
  const [heroData, setHeroData] = useState({
    heroSecHeadLine: "",
    heroSecTagLine: "",
  });

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // GET request for hero content
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHeroData({
            heroSecHeadLine: data[0].heroSecHeadLine,
            heroSecTagLine: data[0].heroSecTagLine,
          });
        }
      })
      .catch((err) => console.error("Main Page API Error:", err));
  }, []);

  // Scroll to Courses section
  const scrollToCourses = () => {
    const section = document.getElementById("courses");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-4">

      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full 
          bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 
          opacity-30 blur-[120px]"
        />

        <div
          className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full 
          bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 
          opacity-25 blur-[100px]"
        />
      </div>

      {/* Content */}
      <div
        className={`
          relative z-10 text-center max-w-3xl
          transition-all duration-1000 ease-out
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <span
          className={`
            inline-block mb-4 rounded-full border border-white/20 bg-white/10
            px-4 py-1 text-sm backdrop-blur
            transition-all duration-700 delay-100
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Beta Now Live
        </span>

        {/* Headline */}
        <h1
          className={`
            text-3xl sm:text-5xl md:text-7xl font-semibold leading-tight
            bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent
            transition-all duration-700 delay-200
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {heroData.heroSecHeadLine}
        </h1>

        {/* Tagline */}
        <p
          className={`
            mt-6 text-gray-300 text-base md:text-lg
            transition-all duration-700 delay-300
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {heroData.heroSecTagLine}
        </p>

        {/* Explore Courses Button */}
        <button
          onClick={scrollToCourses}
          className={`
            mt-8 inline-flex items-center gap-2
            rounded-full px-6 py-3
            bg-white/10 backdrop-blur
            border border-white/20
            text-white
            hover:bg-white/20
            shadow-lg hover:shadow-white/30
            transition-all duration-700 delay-500
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Explore Courses
          <span className="text-xl">→</span>
        </button>
      </div>
    </section>
  );
}
