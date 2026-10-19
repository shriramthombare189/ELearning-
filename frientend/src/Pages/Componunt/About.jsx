import React, { useEffect, useState } from "react";

export default function About() {

  // ✅ API state
  const [aboutData, setAboutData] = useState({
    tagline: "",
    mission: "",
    vision: "",
    chooseUs: [],
  });

  // ✅ Fetch main-page API (single entry table)
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAboutData({
            tagline: data[0].aboutSecTagline || "",
            mission: data[0].aboutSecMissionTagline || "",
            vision: data[0].aboutSecVisionTagline || "",
            chooseUs: data[0].aboutSecChooseUs || [],
          });
        }
      })
      .catch((err) =>
        console.error("About Section API Error:", err)
      );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Liquid Background */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* About Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Platform
          </span>
        </h2>

        {/* ✅ Tagline from API */}
        <p className="mt-6 text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
          {aboutData.tagline}
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Mission */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-white/20 transition">
            <h3 className="text-xl font-semibold mb-3">🎯 Our Mission</h3>
            <p className="text-gray-400">
              {aboutData.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 hover:border-white/20 transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Our Vision</h3>
            <p className="text-gray-400">
              {aboutData.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Why Choose Us?
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutData.chooseUs.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white/5 border border-white/10 p-5 text-center hover:bg-white/10 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
