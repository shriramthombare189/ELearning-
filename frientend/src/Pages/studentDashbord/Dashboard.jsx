import { useEffect, useState } from "react";

/* =======================
   Dashboard Skeleton
======================= */
const DashboardSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">

      {/* Welcome Skeleton */}
      <div>
        <div className="h-8 w-64 rounded bg-white/10" />
        <div className="h-4 w-48 mt-3 rounded bg-white/10" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 bg-white/5 border border-white/10"
          >
            <div className="h-4 w-24 rounded bg-white/10 mb-3" />
            <div className="h-8 w-20 rounded bg-white/10" />
          </div>
        ))}
      </div>

    </div>
  );
};

/* =======================
   Dashboard Main
======================= */
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // 🔹 Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="relative space-y-10 text-white animate-fadeIn">

      {/* Welcome */}
      <div>
        <h1
          className="
            text-2xl md:text-3xl font-semibold
            bg-gradient-to-br from-white to-gray-400
            bg-clip-text text-transparent
          "
        >
          Welcome back, Shriram 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Continue your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          ["Today Progress", "45%"],
          ["Watch Streak 🔥", "7 Days"],
          ["Courses Enrolled", "4"],
          ["Videos Completed", "128"],
        ].map(([title, value]) => (
          <div
            key={title}
            className="
              rounded-2xl p-6
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-lg
              hover:scale-105 hover:shadow-cyan-500/20
              transition-all duration-300
            "
          >
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-3xl font-semibold mt-2">{value}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
