import { Award, Download } from "lucide-react";

const StudentCertificate = () => {
  // 🔴 Change this value from backend later
  const isCertificateAvailable = true; // false केल्यास message दिसेल

  const handleDownload = () => {
    window.print(); // Browser PDF download
  };
  
  // ❌ Certificate NOT available
  if (!isCertificateAvailable) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0b0b0b] border border-red-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Certificate Not Available
          </h2>
          <p className="text-gray-400">
            Please complete the course to unlock your certificate.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Certificate Available
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#050505] p-4 md:p-8 print:bg-white">
      <div
        id="certificate"
        className="
          max-w-5xl mx-auto
          bg-gradient-to-br from-[#0b0b0b] to-[#111]
          border border-indigo-500/30
          rounded-2xl shadow-2xl
          p-6 md:p-10
          print:border-none print:shadow-none
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-indigo-600/20 flex items-center justify-center print:bg-transparent">
              <Award className="text-indigo-500" size={32} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white print:text-black">
            Certificate of Completion
          </h1>
          <p className="text-gray-400 print:text-gray-600 mt-2">
            This certificate is proudly presented to
          </p>
        </div>

        {/* Student Name */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-indigo-400 print:text-black">
            Shriram Thombare
          </h2>
          <p className="text-gray-400 print:text-gray-600 mt-2">
            for successfully completing the course
          </p>
        </div>

        {/* Course */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white print:text-black">
            Spring Boot Mastery Program
          </h3>
          <p className="text-gray-500 print:text-gray-600 mt-2">
            Issued on: 16 Jan 2026
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="text-gray-400 text-sm">
            <p>
              Certificate ID:{" "}
              <span className="text-white">CS-SPR-2026-001</span>
            </p>
            <p>Verified by Coding Shuttle</p>
          </div>

          <button
            onClick={handleDownload}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              transition
            "
          >
            <Download size={18} />
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCertificate;
