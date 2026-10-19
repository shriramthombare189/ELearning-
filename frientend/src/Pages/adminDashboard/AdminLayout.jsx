import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  BookOpen, 
  MessageCircle, 
  LogOut, 
  Layout, 
  Bell, 
  ChevronRight 
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Doubts", path: "/admin/doubts", icon: MessageCircle },
    { name: "Edit Content", path: "/admin/editmainpage", icon: Layout },
  ];

  const currentPage = navItems.find(item => item.path === location.pathname)?.name || "Admin";

  return (
    /* h-screen + overflow-hidden prevents the whole browser window from scrolling */
    <div className="h-screen w-full flex bg-[#050505] text-white overflow-hidden relative font-sans">
      
      {/* Background Glows (Absolute positioned, won't scroll) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 h-[500px] w-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-72 bg-white/[0.02] backdrop-blur-2xl flex-col border-r border-white/5 z-20">
        <div className="p-8 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Layout size={22} className="text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Admin<span className="text-cyan-400">Hub</span></h2>
          </div>
        </div>

        {/* Sidebar Nav (Scrolls internally if too many items) */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-semibold"
                    : "text-gray-400 border-transparent hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden z-10">
        
        {/* Fixed Header */}
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Admin</span>
            <ChevronRight size={14} className="text-gray-700" />
            <span className="text-cyan-400 font-bold tracking-wide uppercase text-xs">{currentPage}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition">
              <Bell size={18} />
            </button>
            <div className="h-9 w-9 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-28 md:pb-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/10 z-50 flex justify-around py-3 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? "text-cyan-400 bg-cyan-500/10" : "text-gray-500"
              }`
            }
          >
            <item.icon size={22} />
            <span className="text-[9px] font-bold uppercase">{item.name.split(" ")[0]}</span>
          </NavLink>
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-red-500/70">
          <LogOut size={22} />
          <span className="text-[9px] font-bold uppercase">Exit</span>
        </button>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.2); }
      `}} />
    </div>
  );
};

export default AdminLayout;