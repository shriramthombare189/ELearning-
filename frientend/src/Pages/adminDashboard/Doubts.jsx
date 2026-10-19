import React, { useEffect, useState } from "react";

const Doubts = () => {

  // ✅ API state
  const [doubts, setDoubts] = useState([]);

  // ✅ Fetch doubts from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setDoubts(data); // direct set
      })
      .catch((err) => {
        console.error("Doubts API Error:", err);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Student Doubts
      </h1>

      <div className="space-y-4">
        {doubts.map((doubt, index) => (
          <div
            key={doubt.id}
            className="
              bg-gray-800 border border-gray-700 rounded-xl p-5
              transform transition-all duration-300
              hover:-translate-y-1 hover:border-green-400 hover:shadow-lg
              hover:shadow-green-500/10
              animate-fadeIn
            "
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* User Info */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white font-semibold">
                  👤 {doubt.name}
                </p>
                <p className="text-xs text-gray-400">
                  📧 {doubt.email}
                </p>
              </div>

              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                New
              </span>
            </div>

            {/* Question */}
            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {doubt.message}
            </p>
          </div>
        ))}

        {/* No data state */}
        {doubts.length === 0 && (
          <p className="text-gray-400 text-sm">
            No doubts found.
          </p>
        )}
      </div>
    </>
  );
};

export default Doubts;
