import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/auth")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((response) => {
        // ✅ FIX HERE
        setUsers(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load users");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-green-400 mb-4">
        👥 User Management
      </h1>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        {loading ? (
          <p className="text-gray-400 text-center">Loading users...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-700/40 transition"
                >
                  <td className="py-3 font-medium text-white">
                    {user.fullName}
                  </td>

                  <td className="py-3">{user.email}</td>

                  <td className="py-3 text-green-400">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Users;
