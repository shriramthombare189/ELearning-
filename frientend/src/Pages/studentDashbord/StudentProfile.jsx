import { useState } from "react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Shriram Thombare",
    email: "shriram@gmail.com",
    role: "Student",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#050505] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl text-white font-semibold">
                {profile.name}
              </h2>
              <p className="text-gray-400">{profile.role}</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Input
              label="Full Name"
              name="name"
              value={tempProfile.name}
              onChange={handleChange}
              isEditing={isEditing}
            />

            <Input
              label="Email"
              name="email"
              value={tempProfile.email}
              onChange={handleChange}
              isEditing={isEditing}
            />

            <Input
              label="Role"
              value={profile.role}
              disabled
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Input Component */
const Input = ({ label, value, name, onChange, isEditing, disabled }) => (
  <div>
    <label className="text-gray-400 text-sm">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled || !isEditing}
      className={`mt-1 w-full px-4 py-2 rounded-lg text-white
        ${
          disabled || !isEditing
            ? "bg-[#050505] border border-white/10 cursor-not-allowed"
            : "bg-[#050505] border border-indigo-500/40"
        }`}
    />
  </div>
);

export default StudentProfile;
