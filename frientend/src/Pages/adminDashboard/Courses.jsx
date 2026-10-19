import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch Courses from API
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((course) => ({
            id: course.id,
            title: course.courseName,
            image: course.courseThumbnail,
            tagline: course.courseTagLine,
            videos: course.videos ? course.videos.length : 0,
          }));
          setCourses(mapped);
        }
      })
      .catch((err) =>
        console.error("Courses API Error:", err)
      );
  }, []);

  // ✅ DELETE COURSE
  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/courses/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // 🔄 Remove deleted course from state
      setCourses((prev) => prev.filter((c) => c.id !== id));

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete course ❌");
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-cyan-400">
          📚 Courses / Playlists
        </h1>

        <button
          onClick={() => navigate("/admin/addcourse")}
          className="
            px-5 py-2 rounded-full text-sm font-semibold
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
            text-black
            hover:opacity-90 hover:scale-105
            transition-all duration-300
            shadow-lg shadow-cyan-500/30
          "
        >
          + Add New Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="
              group rounded-2xl overflow-hidden
              bg-zinc-950 border border-white/10
              shadow-lg hover:border-white/20
              transition-all duration-300
            "
          >
            {/* Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="h-44 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white">
                {course.title}
              </h3>

              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {course.tagline}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                🎥 {course.videos} Videos
              </p>

              <button
                onClick={() => deleteCourse(course.id)}
                className="
                  mt-5 w-full rounded-xl
                  bg-red-500 text-white
                  py-2 text-sm font-medium
                  hover:bg-red-600
                  transition
                "
              >
                Delete Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;
