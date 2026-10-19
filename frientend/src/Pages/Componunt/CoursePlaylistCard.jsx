import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CoursePlaylistPage() {

  // ✅ Main page section
  const [courseSection, setCourseSection] = useState({
    headlines: [],
    tagline: "",
  });

  // ✅ Courses from API
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch main-page content
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCourseSection({
            headlines: data[0].courseSecHeadlines || [],
            tagline: data[0].courseSecTagline || "",
          });
        }
      })
      .catch((err) =>
        console.error("Course Section API Error:", err)
      );
  }, []);

  // 🔹 Fetch courses API
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mappedCourses = data.map((course, index) => ({
            id: course.id,
            title: course.courseName,
            desc: course.courseTagLine,
            image: course.courseThumbnail,
            rating: 4.8, // UI change नको म्हणून static
            videos: course.videos?.length || 0,
            hours: course.videos?.length * 1, // approx
          }));

          setCourses(mappedCourses);
        }
      })
      .catch((err) =>
        console.error("Courses API Error:", err)
      );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            {courseSection.headlines[0]}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {courseSection.headlines[1]}
            </span>
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {courseSection.tagline}
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h3 className="mb-6 text-xl font-semibold">
          Popular Playlists
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-lg hover:border-white/20 transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
                  Playlist
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-lg font-medium">
                    {course.title}
                  </h4>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {course.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-300">
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    🎥 {course.videos} Videos
                  </span>
                </div>

                <button className="mt-4 w-full rounded-xl bg-white text-black py-2 text-sm font-medium hover:bg-gray-200 transition" onClick={() => navigate(`/baycourse/${course.id}`)}>
                  Bay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
