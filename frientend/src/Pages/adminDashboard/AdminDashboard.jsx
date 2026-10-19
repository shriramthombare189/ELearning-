import React, { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalSellCourses: 0,
    totalFeedback: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/admindata")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute -top-24 -left-24 h-[400px] w-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-24 h-[400px] w-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Platform overview & real-time stats
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-400 animate-pulse">
            Loading dashboard data...
          </p>
        )}

        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Users", value: stats.totalUsers },
              { title: "Total Courses", value: stats.totalCourses },
              { title: "Total Sell Courses", value: stats.totalSellCourses },
              { title: "Total Feedback", value: stats.totalFeedback },
            ].map(({ title, value }) => (
              <div
                key={title}
                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <p className="text-gray-400 text-sm tracking-wide font-medium">
                  {title}
                </p>

                <p className="text-4xl font-bold text-white mt-3">
                  {value}
                </p>

                <div className="mt-5 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
