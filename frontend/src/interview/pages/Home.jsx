import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

const Home = () => {
  const navigate = useNavigate();

  const { generateReport, loading } = useInterview();
  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      alert("Please enter the job description.");
      return;
    }

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!selfDescription.trim()) {
      alert("Please describe yourself.");
      return;
    }

    try {
      const report = await generateReport({
        jobDescription,
        resumeFile: resume,
        selfDescription,
      });

      if (report?._id) {
        navigate(`/interview/${report._id}`);
      }
    } catch (error) {
      console.error("Failed to generate interview:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while generating your interview.",
      );
    }
  };
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      {loading && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-slate-700 border-t-indigo-500 rounded-full animate-spin mx-auto" />

            <h2 className="text-lg font-semibold text-slate-100 mt-5">
              Generating your interview
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Analyzing your resume and job description...
            </p>
          </div>
        </div>
      )}
      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Prepare for your{" "}
            <span className="text-indigo-400">next interview</span>
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Upload your resume, add the job description, and let CareerLens AI
            generate a personalized interview preparation experience.
          </p>
        </div>

        {/* Main Card */}
        <form
          onSubmit={handleGenerate}
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Job Description
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Paste the job description you're applying for.
                </p>
              </div>

              <textarea
                name="jobDescription"
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-80 resize-none bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <p className="text-xs text-slate-600 mt-2">
                {jobDescription.length} characters
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Upload Resume
                </label>

                <label
                  htmlFor="resume"
                  className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer bg-slate-950/70 hover:border-indigo-500 hover:bg-indigo-500/5 transition"
                >
                  <div className="text-center">
                    {/* Upload Icon */}
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V3.75m0 0L7.5 8.25M12 3.75l4.5 4.5M5.25 20.25h13.5a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-2.25m-9 0H5.25A2.25 2.25 0 003 16.5V18a2.25 2.25 0 002.25 2.25Z"
                        />
                      </svg>
                    </div>

                    <p className="text-sm text-slate-300">
                      {resume ? resume.name : "Click to upload your resume"}
                    </p>

                    <p className="text-xs text-slate-600 mt-1">PDF only</p>
                  </div>

                  <input
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Self Description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Tell us about yourself
                </label>

                <textarea
                  name="selfDescription"
                  id="selfDescription"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Tell us about your experience, skills, projects, strengths, etc."
                  className="w-full h-40 resize-none bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-600 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20"
            >
              {loading ? "Generating..." : "Generate Interview"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Small Footer Text */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Your information is used only to personalize your interview
          preparation.
        </p>
      </div>
    </main>
  );
};

export default Home;
