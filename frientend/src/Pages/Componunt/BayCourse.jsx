import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const BuyCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ GET COURSE ID FROM URL

  const [selectedPlan, setSelectedPlan] = useState("lifetime");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Course BY ID
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Course API error:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔹 Buy Now Handler
  const handleBuyNow = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // ❌ User NOT Logged In
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    // ✅ Prepare Payment JSON
    const paymentInput = {
      course: {
        id: course.id,
        name: course.courseName,
        price:
          selectedPlan === "lifetime"
            ? course.coursePrice?.[1] // ✅ lifetime
            : course.coursePrice?.[0], // ✅ 6 months
        plan: selectedPlan,
      },
      user: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email: loggedInUser.email,
      },
    };

    localStorage.setItem("paymentInput", JSON.stringify(paymentInput));

    navigate("/paymentpage");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading course...
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
          Course not found
        </div>
      </>
    );
  }

  const displayedPrice =
    selectedPlan === "lifetime"
      ? course.coursePrice?.[1]
      : course.coursePrice?.[0];

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen bg-black text-white px-4 md:px-10 pt-24 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 🔹 LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h1 className="text-3xl font-bold mb-2">
                {course.courseName}
              </h1>
              <p className="text-gray-400 text-sm">
                {course.courseTagLine}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                What you'll learn
              </h2>

              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                {course.whatYouLearn?.map((item, i) => (
                  <li key={i}>✅ {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                This course includes
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                {course.courseIncludes?.map((item, i) => (
                  <p key={i}>✅ {item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 🔹 RIGHT */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit shadow-xl sticky top-28">

            <p className="text-gray-400 text-sm">Course Price</p>
            <h2 className="text-3xl font-bold text-indigo-400 mb-1">
              ₹{displayedPrice}
            </h2>

            <div className="space-y-2 mb-6 mt-4">
              <button
                onClick={() => setSelectedPlan("lifetime")}
                className={`w-full py-3 rounded-xl border transition
                  ${
                    selectedPlan === "lifetime"
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                      : "bg-black/40 border-white/10 text-gray-300"
                  }`}
              >
                Lifetime Access
              </button>

              <button
                onClick={() => setSelectedPlan("6months")}
                className={`w-full py-3 rounded-xl border transition
                  ${
                    selectedPlan === "6months"
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-400"
                      : "bg-black/40 border-white/10 text-gray-300"
                  }`}
              >
                6 Months Access
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
            >
              Buy Now
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCourse;
