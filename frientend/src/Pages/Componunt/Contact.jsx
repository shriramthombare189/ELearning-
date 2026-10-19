import React, { useEffect, useState } from "react";
import Footer from "./Footer";

export default function Contact() {

  // ✅ API state (existing – untouched)
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    location: "",
  });

  // ✅ Contact form state (NEW – required only)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Fetch main-page API (unchanged)
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setContactData({
            email: data[0].contactEmail || "",
            phone: data[0].contactNumber || "",
            location: data[0].contactLocation || "",
          });
        }
      })
      .catch((err) =>
        console.error("Contact Section API Error:", err)
      );
  }, []);

  // ✅ Handle input change (NEW)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Save Contact Message API (NEW – ONLY SAVE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save message");
      }

      // optional reset
      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact Save Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-40 -right-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          Contact{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Us
          </span>
        </h2>

        <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto">
          Have a question, feedback, or need help? Fill out the form and we’ll
          get back to you as soon as possible.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">

          {/* Contact Info */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h3 className="text-xl font-semibold mb-4">📍 Get in Touch</h3>
            <ul className="space-y-4 text-gray-400">
              <li>📧 Email: {contactData.email}</li>
              <li>📞 Phone: {contactData.phone}</li>
              <li>📍 Location: {contactData.location}</li>
            </ul>
          </div>

          {/* ✅ Contact Form – SAVE API CONNECTED */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-zinc-950 p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">✉️ Send Message</h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-2 outline-none focus:border-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-2 outline-none focus:border-blue-500"
              required
            />

            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full rounded-xl bg-black border border-white/10 px-4 py-2 outline-none focus:border-blue-500"
              required
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-white text-black py-2 font-medium hover:bg-gray-200 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
