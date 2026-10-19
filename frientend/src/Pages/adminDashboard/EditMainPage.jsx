import { useEffect, useState } from "react";

const EditMainPage = () => {

  // ✅ Safe default structure
  const [data, setData] = useState({
    id: 1,
    heroSecHeadLine: "",
    heroSecTagLine: "",
    courseSecHeadlines: [],
    courseSecTagline: "",
    aboutSecTagline: "",
    aboutSecMissionTagline: "",
    aboutSecVisionTagline: "",
    aboutSecChooseUs: [],
    contactEmail: "",
    contactNumber: "",
    contactLocation: "",
    footerSecTagLine: "",
    instagramLink: "",
    feacBookLink: "",
    linkdinLink: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH without /1
  useEffect(() => {
    fetch("http://localhost:8080/api/main-page")
      .then((res) => {
        if (!res.ok) throw new Error("API Failed");
        return res.json();
      })
      .then((result) => {

        // ✅ If API returns ARRAY → pick ID = 1
        if (Array.isArray(result)) {
          const record = result.find((item) => item.id === 1);
          if (record) setData(record);
        }
        // ✅ If API returns OBJECT directly
        else if (result.id === 1) {
          setData(result);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Normal field change
  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 Array field change
  const handleArrayChange = (key, index, value) => {
    const updated = [...data[key]];
    updated[index] = value;
    setData((prev) => ({ ...prev, [key]: updated }));
  };

  // 🔹 SAVE (no /1 in URL)
  const handleSave = () => {
    fetch("http://localhost:8080/api/main-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // id = 1 goes in body
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        alert("Page Updated Successfully ✅");
        setEditMode(false);
      })
      .catch(() => alert("Save Error ❌"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Edit Main Page (Fixed ID : 1)
          </h1>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700"
            >
              Save
            </button>
          )}
        </div>

        {/* HERO */}
        <Section title="Hero Section">
          <Input
            label="Headline"
            value={data.heroSecHeadLine}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("heroSecHeadLine", e.target.value)
            }
          />
          <Textarea
            label="Tagline"
            value={data.heroSecTagLine}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("heroSecTagLine", e.target.value)
            }
          />
        </Section>

        {/* COURSE */}
        <Section title="Course Section">
          {data.courseSecHeadlines.map((item, i) => (
            <Input
              key={i}
              label={`Headline ${i + 1}`}
              value={item}
              disabled={!editMode}
              onChange={(e) =>
                handleArrayChange(
                  "courseSecHeadlines",
                  i,
                  e.target.value
                )
              }
            />
          ))}

          <Textarea
            label="Course Tagline"
            value={data.courseSecTagline}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("courseSecTagline", e.target.value)
            }
          />
        </Section>

        {/* ABOUT */}
        <Section title="About Section">
          <Textarea
            label="About"
            value={data.aboutSecTagline}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("aboutSecTagline", e.target.value)
            }
          />
          <Textarea
            label="Mission"
            value={data.aboutSecMissionTagline}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("aboutSecMissionTagline", e.target.value)
            }
          />
          <Textarea
            label="Vision"
            value={data.aboutSecVisionTagline}
            disabled={!editMode}
            onChange={(e) =>
              handleChange("aboutSecVisionTagline", e.target.value)
            }
          />

          {data.aboutSecChooseUs.map((item, i) => (
            <Input
              key={i}
              label={`Why Choose Us ${i + 1}`}
              value={item}
              disabled={!editMode}
              onChange={(e) =>
                handleArrayChange(
                  "aboutSecChooseUs",
                  i,
                  e.target.value
                )
              }
            />
          ))}
        </Section>

        {/* CONTACT */}
        <Section title="Contact & Footer">
          <Input label="Email" value={data.contactEmail} disabled={!editMode}
            onChange={(e) => handleChange("contactEmail", e.target.value)} />
          <Input label="Phone" value={data.contactNumber} disabled={!editMode}
            onChange={(e) => handleChange("contactNumber", e.target.value)} />
          <Input label="Location" value={data.contactLocation} disabled={!editMode}
            onChange={(e) => handleChange("contactLocation", e.target.value)} />
          <Textarea label="Footer Text" value={data.footerSecTagLine} disabled={!editMode}
            onChange={(e) => handleChange("footerSecTagLine", e.target.value)} />
        </Section>
      </div>
    </div>
  );
};

/* ===== Reusable ===== */

const Section = ({ title, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-2 rounded-lg bg-black/40 border border-white/10
      focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <textarea
      rows="3"
      {...props}
      className="w-full mt-1 p-2 rounded-lg bg-black/40 border border-white/10
      focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60"
    />
  </div>
);

export default EditMainPage;
