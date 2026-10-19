import { useState } from "react";

export default function AddCourseWizard() {
    const [step, setStep] = useState(1);

    const [course, setCourse] = useState({
        courseName: "",
        courseThumbnail: "",
        courseTagLine: "",
        courseDescription: "",
        features: [],
        whatYouLearn: [],
        courseIncludes: [],
        coursePrice: { sixMonth: "", lifetime: "" },
        videos: []
    });

    const [video, setVideo] = useState({
        title: "",
        duration: "",
        youtubeId: "",
        quiz: []
    });

    const [quiz, setQuiz] = useState({
        question: "",
        options: ["", "", ""],
        answer: ""
    });

    /* ------------------ Logic Helpers ------------------ */
    const addListItem = (key, value, clear) => {
        if (!value.trim()) return;
        setCourse(prev => ({ ...prev, [key]: [...prev[key], value] }));
        clear("");
    };

    const removeListItem = (key, index) => {
        setCourse(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index)
        }));
    };

    const addQuizToVideo = () => {
        // Validation: Prevent more than 5
        if (video.quiz.length >= 5) {
            alert("This video already has 5 quizzes. You cannot add more.");
            return;
        }

        if (!quiz.question || !quiz.answer) {
            alert("Please fill in the quiz question and the correct answer.");
            return;
        }
        setVideo(prev => ({ ...prev, quiz: [...prev.quiz, quiz] }));
        setQuiz({ question: "", options: ["", "", ""], answer: "" });
    };

    const addVideoToCourse = () => {
        if (!video.title || !video.youtubeId) {
            alert("Video title and YouTube ID are required.");
            return;
        }

        // Validation: Ensure exactly 5
        if (video.quiz.length !== 5) {
            alert(`A video must have exactly 5 quizzes to be saved. (Currently: ${video.quiz.length})`);
            return;
        }

        setCourse(prev => ({ ...prev, videos: [...prev.videos, video] }));
        setVideo({ title: "", duration: "", youtubeId: "", quiz: [] });
    };

    const removeVideo = (index) => {
        setCourse(prev => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index)
        }));
    };

    /* ------------------ Final Submission ------------------ */
    const submitData = async () => {
        const payload = {
            ...course,
            coursePrice: [
                String(course.coursePrice.sixMonth || "0"),
                String(course.coursePrice.lifetime || "0")
            ]
        };

        try {
            const res = await fetch("http://localhost:8080/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("API Error");
            alert("🎉 Course Published Successfully!");
            console.log("Response:", await res.json());
        } catch (err) {
            console.error("Save Failed:", err);
            alert("❌ Failed to save course. Is the server running?");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-slate-200 flex justify-center p-6 font-sans">
            <div className="w-full max-w-4xl bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl">

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex justify-between text-xs mb-2 text-indigo-400 font-bold uppercase tracking-widest">
                        <span>Step {step} of 5</span>
                        <span>{Math.round((step / 5) * 100)}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full">
                        <div 
                            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </div>

                {/* STEP 1: BASIC INFO */}
                {step === 1 && (
                    <Step title="Basic Information">
                        <Input label="Course Name" placeholder="e.g. Master React in 30 Days" value={course.courseName} onChange={e => setCourse({ ...course, courseName: e.target.value })} />
                        <Input label="Thumbnail URL" placeholder="https://image-link.com" value={course.courseThumbnail} onChange={e => setCourse({ ...course, courseThumbnail: e.target.value })} />
                        <Input label="Tag Line" placeholder="Short catchy headline" value={course.courseTagLine} onChange={e => setCourse({ ...course, courseTagLine: e.target.value })} />
                        <Textarea label="Course Description" placeholder="Detailed breakdown of the course..." value={course.courseDescription} onChange={e => setCourse({ ...course, courseDescription: e.target.value })} />
                    </Step>
                )}

                {/* STEP 2: DYNAMIC LISTS */}
                {step === 2 && (
                    <Step title="Course Highlights">
                        <ListInput title="Core Features" list={course.features} onAdd={(v, c) => addListItem("features", v, c)} onRemove={(i) => removeListItem("features", i)} />
                        <ListInput title="What You Learn" list={course.whatYouLearn} onAdd={(v, c) => addListItem("whatYouLearn", v, c)} onRemove={(i) => removeListItem("whatYouLearn", i)} />
                        <ListInput title="What's Included" list={course.courseIncludes} onAdd={(v, c) => addListItem("courseIncludes", v, c)} onRemove={(i) => removeListItem("courseIncludes", i)} />
                    </Step>
                )}

                {/* STEP 3: PRICING */}
                {step === 3 && (
                    <Step title="Set Pricing">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
                            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                                <label className="block text-sm font-bold text-indigo-400 mb-4 uppercase">6 Month Access</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl text-gray-500 font-bold">$</span>
                                    <input type="number" className="bg-transparent text-4xl font-bold outline-none w-full border-b border-gray-700 focus:border-indigo-500 transition"
                                        value={course.coursePrice.sixMonth} 
                                        onChange={e => setCourse({ ...course, coursePrice: { ...course.coursePrice, sixMonth: e.target.value }})} />
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                                <label className="block text-sm font-bold text-emerald-400 mb-4 uppercase">Lifetime Access</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl text-gray-500 font-bold">$</span>
                                    <input type="number" className="bg-transparent text-4xl font-bold outline-none w-full border-b border-gray-700 focus:border-emerald-500 transition"
                                        value={course.coursePrice.lifetime} 
                                        onChange={e => setCourse({ ...course, coursePrice: { ...course.coursePrice, lifetime: e.target.value }})} />
                                </div>
                            </div>
                        </div>
                    </Step>
                )}

                {/* STEP 4: CURRICULUM & QUIZ */}
                {step === 4 && (
                    <Step title="Curriculum Builder">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-4 bg-gray-800/30 p-6 rounded-2xl border border-gray-800">
                                <h4 className="text-indigo-400 font-bold text-sm uppercase">1. Add Video Details</h4>
                                <Input label="Video Title" value={video.title} onChange={e => setVideo({ ...video, title: e.target.value })} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Duration" placeholder="10:00" value={video.duration} onChange={e => setVideo({ ...video, duration: e.target.value })} />
                                    <Input label="YouTube ID" placeholder="dQw4w9WgXcQ" value={video.youtubeId} onChange={e => setVideo({ ...video, youtubeId: e.target.value })} />
                                </div>

                                <div className="p-4 bg-gray-900 rounded-xl space-y-3 border border-gray-700">
                                    <h5 className="text-xs font-bold text-emerald-400 uppercase">2. Add Quiz (Exactly 5 Required)</h5>
                                    <Input label="Question" value={quiz.question} onChange={e => setQuiz({ ...quiz, question: e.target.value })} />
                                    <div className="grid grid-cols-1 gap-2">
                                        {quiz.options.map((opt, i) => (
                                            <input key={i} className="bg-gray-800 p-2 rounded-lg text-sm border border-gray-700 focus:border-indigo-500 outline-none"
                                                value={opt} placeholder={`Option ${i + 1}`}
                                                onChange={e => {
                                                    const ops = [...quiz.options];
                                                    ops[i] = e.target.value;
                                                    setQuiz({ ...quiz, options: ops });
                                                }} />
                                        ))}
                                    </div>
                                    <Input label="Correct Answer" value={quiz.answer} onChange={e => setQuiz({ ...quiz, answer: e.target.value })} />
                                    <button onClick={addQuizToVideo} className="w-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 hover:text-white transition">
                                        Attach Quiz ({video.quiz.length}/5)
                                    </button>
                                </div>

                                <button onClick={addVideoToCourse} className="w-full bg-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition">
                                    Save Video to Curriculum
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-gray-400 font-bold text-sm uppercase">Added Videos ({course.videos.length})</h4>
                                <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                                    {course.videos.map((v, i) => (
                                        <div key={i} className="flex justify-between items-center bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500 shadow-md">
                                            <div>
                                                <p className="font-bold text-indigo-100">{v.title}</p>
                                                <p className="text-xs text-gray-400">{v.duration} • {v.quiz.length} Quizzes</p>
                                            </div>
                                            <button onClick={() => removeVideo(i)} className="text-red-400 p-2 hover:bg-red-400/10 rounded-lg transition">×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Step>
                )}

                {/* STEP 5: FINAL REVIEW */}
                {step === 5 && (
                    <Step title="Review & Publish">
                        <div className="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-2xl mb-6">
                            <h3 className="text-2xl font-bold text-indigo-100 mb-2">{course.courseName || "Untitled Course"}</h3>
                            <p className="text-gray-400 text-sm italic">{course.courseTagLine}</p>
                        </div>
                        <pre className="bg-black/50 p-6 rounded-2xl text-[10px] md:text-xs text-emerald-400 border border-emerald-900/30 overflow-auto max-h-80 custom-scrollbar">
                            {JSON.stringify(course, null, 2)}
                        </pre>
                    </Step>
                )}

                {/* NAVIGATION */}
                <div className="flex justify-between mt-12 gap-4">
                    <button 
                        disabled={step === 1} 
                        onClick={() => setStep(step - 1)}
                        className={`px-8 py-3 rounded-xl font-bold transition-all ${step === 1 ? "opacity-20 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"}`}>
                        Previous
                    </button>

                    {step < 5 ? (
                        <button onClick={() => setStep(step + 1)} className="bg-indigo-600 px-10 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all">
                            Next Step
                        </button>
                    ) : (
                        <button onClick={submitData} className="bg-emerald-600 px-10 py-3 rounded-xl font-bold hover:bg-emerald-500 shadow-xl shadow-emerald-600/20 transition-all">
                            Publish Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------- UI Components ---------- */
const Step = ({ title, children }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-xl font-bold text-indigo-100 border-l-4 border-indigo-500 pl-4">{title}</h3>
        {children}
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <input className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-600" {...props} />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        <textarea className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none h-32 resize-none transition-all placeholder:text-gray-600" {...props} />
    </div>
);

function ListInput({ title, list, onAdd, onRemove }) {
    const [value, setValue] = useState("");
    return (
        <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</label>
            <div className="flex gap-2">
                <input className="bg-gray-800/50 border border-gray-700 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                    value={value} placeholder={`Add a ${title.toLowerCase()}...`}
                    onChange={e => setValue(e.target.value)} 
                    onKeyPress={e => e.key === 'Enter' && onAdd(value, setValue)} />
                <button onClick={() => onAdd(value, setValue)} className="bg-indigo-600 px-6 rounded-xl font-bold hover:bg-indigo-500 transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
                {list.map((item, i) => (
                    <span key={i} className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-1.5 rounded-full text-sm flex items-center gap-3">
                        {item}
                        <button onClick={() => onRemove(i)} className="text-indigo-500 hover:text-indigo-300 text-lg leading-none">&times;</button>
                    </span>
                ))}
            </div>
        </div>
    );
}