import { useNavigate } from "react-router-dom";

const StudentSettings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear all stored user data
    localStorage.clear();

    // 🔁 Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-10 w-full max-w-md text-center shadow-2xl">

        {/* 🧑 Cartoon User */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 
                          flex items-center justify-center text-5xl animate-bounce shadow-lg">
            👤
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Logout</h1>
        <p className="text-gray-400 text-sm mb-8">
          You will be redirected to login page
        </p>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-red-500 to-pink-600
            hover:from-red-400 hover:to-pink-500
            transition-all duration-300
            shadow-lg shadow-red-500/30
            active:scale-95
          "
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default StudentSettings;
