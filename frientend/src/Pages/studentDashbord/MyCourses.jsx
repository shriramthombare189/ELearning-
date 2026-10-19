import { useEffect, useState } from "react";

const MyCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // ✅ Get logged-in user from localStorage
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const userEmail = loggedInUser?.email;

  useEffect(() => {
    if (!userEmail) {
      console.error("User not logged in");
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/api/purchase/email/${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mappedCourses = data.map((item) => ({
            id: item.courseId,
            title: item.courseName,
          }));
          setCourses(mappedCourses);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("My Courses API Error:", err);
        setLoading(false);
      });
  }, [userEmail]);

  // 🔹 Skeleton
  const SkeletonCard = () => (
    <div className="rounded-xl p-6 bg-white/5 backdrop-blur border border-white/10 shadow-lg animate-pulse">
      <div className="h-4 w-3/4 bg-white/20 rounded mb-3" />
      <div className="h-3 w-1/2 bg-white/10 rounded mb-4" />
      <div className="h-10 w-full bg-white/10 rounded" />
    </div>
  );

  return (
    <div className="space-y-8 text-white">
      <div>
        <h1 className="text-2xl font-bold text-blue-400">
          My Courses 📚
        </h1>
        <p className="text-sm text-gray-400">
          Your purchased courses
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className="text-gray-400">
          You have not purchased any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative overflow-hidden rounded-xl
                bg-white/5 backdrop-blur
                border border-white/10
                p-6 shadow-lg
                hover:scale-105 transition-all duration-300"
            >
              <div className="absolute -top-16 -right-16 h-32 w-32 bg-blue-500/20 blur-3xl rounded-full" />

              <div className="relative z-10">
                <h2 className="text-lg font-semibold">
                  {course.title}
                </h2>

                <p className="text-xs text-green-400 mt-1">
                  ✔ Purchased
                </p>

                {/* ✅ SAVE courseId + REDIRECT */}
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "activeCourseId",
                      course.id
                    );

                    window.location.href =
                      "http://localhost:3000/dashboard/videoplayer";
                  }}
                  className="mt-5 w-full py-2 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-sm font-semibold transition active:scale-95"
                >
                  Continue Learning →
                </button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
