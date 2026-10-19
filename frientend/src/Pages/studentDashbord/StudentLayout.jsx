import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  // { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "My Courses", path: "/dashboard/mycourses", icon: "📚" },
  // { name: "Certificates", path: "/dashboard/studentcertificate", icon: "🎓" },
  // { name: "Profile", path: "/dashboard/studentprofile", icon: "👤" },
  { name: "Settings", path: "/dashboard/studentsettings", icon: "⚙️" },
];

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page name for the mobile/tablet view
  const currentPage = navItems.find(item => item.path === location.pathname)?.name || "Learning";

  return (
    /* h-screen + overflow-hidden: This locks the browser window */
    <div className="h-screen w-full flex bg-[#020202] text-white overflow-hidden relative font-sans">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-72 flex-col bg-white/[0.02] backdrop-blur-3xl border-r border-white/5 shadow-2xl z-20">
        
        {/* Sidebar Header */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎓</div>
            <div>
              <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Student<span className="text-cyan-400">Pro</span>
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Learning Space</p>
            </div>
          </div>
        </div>

        {/* Navigation Links - Scrolls internally if items exceed height */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-lg shadow-cyan-500/5 font-bold"
                    : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[15px]">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-4 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            ← Back to Portal
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden z-10">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden h-16 flex-shrink-0 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md border-b border-white/5">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">{currentPage}</span>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-[1px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-[10px]">👤</div>
          </div>
        </header>

        {/* Scrollable Page Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-6 md:p-10 pb-32 md:pb-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 z-50 px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive ? "text-cyan-400 scale-110" : "text-gray-500"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{item.name.split(" ")[0]}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Internal CSS for custom scrollbar within this layout */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.2);
        }
      `}} />
    </div>
  );
};

export default StudentLayout;