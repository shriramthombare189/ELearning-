import { useEffect, useState } from "react";

const StudentVideoPlayer = () => {
  // 🔹 API driven states
  const [videoList, setVideoList] = useState([]);
  const [quizData, setQuizData] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [courseName, setCourseName] = useState(""); // Added for API
  const [courseId, setCourseId] = useState(null); // Get from localStorage
  const [userEmail, setUserEmail] = useState(""); // Get from localStorage

  const [completedVideos, setCompletedVideos] = useState(
    JSON.parse(localStorage.getItem("completedVideos")) || []
  );

  const [note, setNote] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [marks, setMarks] = useState(null);

  /* 🔹 Initialize courseId and userEmail from localStorage */
  useEffect(() => {
    const activeCourseId = localStorage.getItem("activeCourseId");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (activeCourseId) {
      setCourseId(parseInt(activeCourseId));
    }
    
    if (loggedInUser?.email) {
      setUserEmail(loggedInUser.email);
    }
  }, []);

  /* 🔹 API Integration: Save Progress Function */
  const saveLearningData = async (overrides = {}) => {
    const totalVideos = videoList.length;
    const updatedCompletedVideos = overrides.completedVideos || completedVideos;
    const progress = totalVideos > 0 ? Math.round((updatedCompletedVideos.length / totalVideos) * 100) : 0;

    const payload = {

      userEmail: userEmail || "guest@example.com", // From localStorage
      courseId: courseId || 0,
      courseName: courseName,
      totalVideos: totalVideos,

      currentVideoId: currentVideo?.id,
      currentVideoTitle: currentVideo?.title,
      currentVideoDuration: currentVideo?.duration,
      youtubeId: currentVideo?.youtubeId,
      videoCompleted: overrides.videoCompleted || false,
      videoCompletedAt: overrides.videoCompleted ? new Date().toISOString() : null,

      noteContent: overrides.note || note,
      noteAutoSaved: true,
      noteLastSavedAt: new Date().toISOString(),

      quizTotalQuestions: 5,
      quizMarksObtained: overrides.marks !== undefined ? overrides.marks : marks,
      quizPassed: (overrides.marks !== undefined ? overrides.marks : marks) >= 3,
      quizAnswers: answers,
      quizAttemptedAt: overrides.marks !== undefined ? new Date().toISOString() : null,

      completedVideos: updatedCompletedVideos,
      lastWatchedVideoId: currentVideo?.id,
      progressPercentage: progress,
      courseCompleted: updatedCompletedVideos.length === totalVideos,

      device: "WEB",
      platform: "DESKTOP",
      ipAddress: "127.0.0.1", // Usually handled by backend or external service
      updatedAt: new Date().toISOString()
    };

    try {
      await fetch("http://localhost:8080/api/learning/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Progress saved to API");
    } catch (err) {
      console.error("Failed to sync with API:", err);
    }
  };

  /* 🔹 Fetch Course by ID */
  useEffect(() => {
    if (!courseId) return; // Wait for courseId to be set
    
    fetch(`http://localhost:8080/api/courses/${courseId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load course");
        return res.json();
      })
      .then(course => {
        if (!course.videos || course.videos.length === 0) return;

        setCourseName(course.title || "Course");

        // ✅ Map videos
        const mappedVideos = course.videos.map((v, index) => ({
          id: index + 1,
          title: v.title,
          duration: v.duration,
          youtubeId: v.youtubeId,
        }));

        // ✅ Map quiz
        const mappedQuiz = {};
        course.videos.forEach((v, index) => {
          mappedQuiz[index + 1] = v.quiz.map(q => ({
            q: q.question,
            o: q.options,
            a: q.answer,
          }));
        });

        setVideoList(mappedVideos);
        setQuizData(mappedQuiz);
        setCurrentVideo(mappedVideos[0]);
      })
      .catch(err => console.error("Course API Error:", err));
  }, [courseId]);

  /* Load Notes & Quiz */
  useEffect(() => {
    if (!currentVideo) return;

    setNote(localStorage.getItem(`note-${currentVideo.id}`) || "");
    setMarks(JSON.parse(localStorage.getItem(`marks-${currentVideo.id}`)));
    setCurrentQ(0);
    setAnswers([]);
  }, [currentVideo]);

  /* Save Notes */
  const handleNoteChange = (value) => {
    setNote(value);
    localStorage.setItem(`note-${currentVideo.id}`, value);
    // Sync note with API
    saveLearningData({ note: value });
  };

  /* Handle Answer */
  const handleAnswer = (ans) => {
    const updated = [...answers];
    updated[currentQ] = ans;
    setAnswers(updated);
  };

  /* Submit Quiz */
  const submitQuiz = () => {
    let score = 0;
    quizData[currentVideo.id]?.forEach((q, i) => {
      if (answers[i] === q.a) score++;
    });

    setMarks(score);
    localStorage.setItem(`marks-${currentVideo.id}`, score);
    const passed = score >= 3;
    localStorage.setItem(`quiz-passed-${currentVideo.id}`, passed);
    
    // Sync quiz results with API
    saveLearningData({ marks: score });
  };

  /* Mark Video Completed */
  const markCompleted = () => {
    if (!localStorage.getItem(`quiz-passed-${currentVideo.id}`)) {
      alert("⚠️ Complete quiz first");
      return;
    }

    let updated = [...completedVideos];
    if (!completedVideos.includes(currentVideo.id)) {
      updated = [...completedVideos, currentVideo.id];
      setCompletedVideos(updated);
      localStorage.setItem("completedVideos", JSON.stringify(updated));
    }

    // Sync completion with API
    saveLearningData({ videoCompleted: true, completedVideos: updated });

    const idx = videoList.findIndex(v => v.id === currentVideo.id);
    if (videoList[idx + 1]) setCurrentVideo(videoList[idx + 1]);
  };

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading course...
      </div>
    );
  }

  const isLocked = (id) => id !== 1 && !completedVideos.includes(id - 1);
  const quiz = quizData[currentVideo.id]?.[currentQ];

  return (
    <div className="w-full min-h-screen bg-black p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Video Section */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
          <iframe
            className="w-full aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
            allowFullScreen
          />

          <h1 className="mt-4 text-xl font-semibold">
            {currentVideo.title}
          </h1>

          <button
            onClick={markCompleted}
            className="mt-4 px-6 py-2 bg-indigo-600 rounded-xl"
          >
            Mark as Completed
          </button>

          {/* Notes Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-indigo-400">
                📝 Personal Notes
              </h3>
              <span className="text-xs text-gray-400">
                Auto-saved
              </span>
            </div>

            <textarea
              value={note}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write your learning notes here..."
              className="
                w-full min-h-[260px] p-5
                rounded-2xl
                bg-black/60
                border border-white/15
                text-gray-200
                placeholder-gray-500
                focus:outline-none
                focus:border-indigo-500/60
                focus:ring-2 focus:ring-indigo-500/20
                transition
              "
            />
          </div>

          {/* Quiz Section */}
          {quiz && (
            <div className="mt-10 border border-white/15 rounded-2xl p-6 bg-black/60 backdrop-blur">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-yellow-400 font-semibold">
                  🧠 Question {currentQ + 1}
                  <span className="text-gray-400"> / 5</span>
                </h3>
                <span className="text-xs text-gray-400">
                  MCQ Quiz
                </span>
              </div>

              <p className="mb-5 text-base text-gray-200 leading-relaxed">
                {quiz.q}
              </p>

              <div className="space-y-3">
                {quiz.o.map(opt => (
                  <label
                    key={opt}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl cursor-pointer
                      border border-white/10 transition
                      ${
                        answers[currentQ] === opt
                          ? "bg-indigo-600/20 border-indigo-500"
                          : "bg-black/40 hover:border-indigo-400/40"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      checked={answers[currentQ] === opt}
                      onChange={() => handleAnswer(opt)}
                      className="accent-indigo-500"
                    />
                    <span className="text-sm text-gray-200">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                {currentQ < 4 ? (
                  <button
                    onClick={() => setCurrentQ(currentQ + 1)}
                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-medium"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={submitQuiz}
                    className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-500 transition font-medium"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>

              {marks !== null && (
                <div className="mt-6 p-4 rounded-xl bg-green-600/10 border border-green-500/30">
                  <p className="text-green-400 font-semibold mb-3">
                    ✅ Marks: {marks} / 5
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQ(0);
                      setAnswers([]);
                      setMarks(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30 transition"
                  >
                    🔁 Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              📚 Course Playlist
            </h3>
            <span className="text-xs text-gray-400">
              {videoList.length} Videos
            </span>
          </div>

          <div className="space-y-2">
            {videoList.map((video, index) => {
              const locked = isLocked(video.id);
              const isActive = currentVideo?.id === video.id;

              return (
                <button
                  key={video.id}
                  disabled={locked}
                  onClick={() => setCurrentVideo(video)}
                  className={`
                    w-full flex items-center justify-between
                    p-3 rounded-xl text-left transition
                    border
                    ${
                      locked
                        ? "bg-black/30 border-white/5 text-gray-500 cursor-not-allowed"
                        : isActive
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-black/40 border-white/10 hover:border-indigo-400/40 hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold
                        ${
                          locked
                            ? "bg-gray-600/30 text-gray-400"
                            : isActive
                              ? "bg-indigo-600 text-white"
                              : "bg-white/10 text-gray-300"
                        }
                      `}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {video.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {locked && <span title="Locked">🔒</span>}
                    {isActive && <span title="Playing">▶</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVideoPlayer;