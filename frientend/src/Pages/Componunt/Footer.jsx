import React, { useEffect, useState } from "react";

export default function Footer() {

  const [footerData, setFooterData] = useState({
    brandName: "",
    description: "",
    email: "",
    location: "",
    phone: "",
    copyright: "",
  });

  // ✅ Fetch single-row table
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFooterData({
            brandName: data[0].footerBrandName || "LearningPlatform",
            description: data[0].footerDescription || "",
            email: data[0].contactEmail || "",
            location: data[0].contactLocation || "",
            phone: data[0].contactNumber || "",
            copyright:
              data[0].copyrightText ||
              "© 2026 Learning Platform. All rights reserved.",
          });
        }
      })
      .catch((err) => console.error("Footer API Error:", err));
  }, []);

  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden">

      {/* Liquid glow */}
      <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">
  {footerData.brandName.replace("Platform", "")}
  <span className="text-blue-500">Platform</span>
</h2>
            <p className="mt-4 text-sm text-gray-500">
              {footerData.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#courses" className="hover:text-white">Courses</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 {footerData.email}</li>
              <li>📍 {footerData.location}</li>
              <li>📞 {footerData.phone}</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p>{footerData.copyright}</p>

          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
