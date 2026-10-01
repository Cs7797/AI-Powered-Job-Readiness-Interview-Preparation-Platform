import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router-dom";

const Interview = () => {
  const { report, loading, downloadResume } = useInterview();

  const [activeSection, setActiveSection] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);

  const { interviewId } = useParams();

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm text-slate-400">
            Loading your interview report...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // No report
  // -----------------------------

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-200">
            Interview report not found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            We couldn't find this interview report.
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Backend data
  // -----------------------------

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const skillGaps = report.skillGaps || [];
  const preparationPlan = report.preparationPlan || [];

  const sections = [
    {
      id: "technical",
      label: "Technical Questions",
      shortLabel: "Technical",
      icon: "</>",
      count: technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      shortLabel: "Behavioral",
      icon: "▱",
      count: behavioralQuestions.length,
    },
    {
      id: "roadmap",
      label: "Preparation Plan",
      shortLabel: "Preparation",
      icon: "➤",
      count: preparationPlan.length,
    },
  ];

  const questions =
    activeSection === "technical" ? technicalQuestions : behavioralQuestions;

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);

    if (sectionId === "technical") {
      setOpenQuestion(technicalQuestions[0]?._id || null);
    } else if (sectionId === "behavioral") {
      setOpenQuestion(behavioralQuestions[0]?._id || null);
    } else {
      setOpenQuestion(null);
    }

    // Scroll back to the beginning of the report content on mobile
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-3 sm:p-4 md:p-6">
      <div className="max-w-375 mx-auto">
        <div className="min-h-[calc(100vh-48px)] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* ================================================= */}
          {/* LEFT SIDEBAR - DESKTOP ONLY */}
          {/* ================================================= */}

          <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950/50 hidden md:block">
            <div className="p-6">
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-5">
                Sections
              </p>

              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);

                      if (section.id === "technical") {
                        setOpenQuestion(technicalQuestions[0]?._id || null);
                      } else if (section.id === "behavioral") {
                        setOpenQuestion(behavioralQuestions[0]?._id || null);
                      } else {
                        setOpenQuestion(null);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition ${
                      activeSection === section.id
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs ${
                          activeSection === section.id
                            ? "text-indigo-400"
                            : "text-slate-500"
                        }`}
                      >
                        {section.icon}
                      </span>

                      <span>{section.label}</span>
                    </div>

                    <span className="text-[10px] bg-slate-800 px-2 py-1 rounded-full text-slate-500">
                      {section.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate */}

            <div className="border-t border-slate-800 p-6 mt-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3">
                Candidate
              </p>

              <h3 className="text-sm font-semibold text-slate-200">
                Interview Analysis
              </h3>

              <p className="text-xs text-slate-500 mt-1">AI Generated Report</p>

              <div className="mt-5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500">Match Score</span>

                  <span className="text-indigo-400">
                    {report.matchScore ?? 0}%
                  </span>
                </div>

                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${report.matchScore ?? 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* ================================================= */}
          {/* CENTER */}
          {/* ================================================= */}

          <main className="flex-1 min-w-0">
            {/* Header */}

            <div className="px-4 sm:px-5 md:px-7 py-4 md:py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-slate-100">
                  {activeSection === "technical" && "Technical Questions"}

                  {activeSection === "behavioral" && "Behavioral Questions"}

                  {activeSection === "roadmap" && "Preparation Plan"}
                </h1>

                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  AI-generated based on your resume and target role
                </p>
              </div>

              {activeSection !== "roadmap" && (
                <span className="hidden sm:block text-[11px] text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full shrink-0 ml-4">
                  {questions.length} questions
                </span>
              )}
            </div>

            {/* ================================================= */}
            {/* MOBILE SECTION NAVIGATION */}
            {/* ================================================= */}

            <div className="md:hidden border-b border-slate-800 bg-slate-950/40 p-3">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      activeSection === section.id
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                        : "bg-slate-800/50 text-slate-500 border border-slate-800"
                    }`}
                  >
                    <span className="text-[11px]">{section.icon}</span>

                    <span>{section.shortLabel}</span>

                    <span className="text-[9px] bg-slate-900 px-1.5 py-0.5 rounded-full">
                      {section.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* MOBILE SUMMARY */}
            {/* ================================================= */}

            <div className="xl:hidden md:hidden p-4 border-b border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                {/* Match Score */}

                <div className="border border-slate-800 bg-slate-800/30 rounded-xl p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    Match Score
                  </p>

                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-2xl font-bold text-slate-100">
                      {report.matchScore ?? 0}
                    </span>

                    <span className="text-xs text-slate-500 mb-1">%</span>
                  </div>

                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${report.matchScore ?? 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Skill Gap Count */}

                <div className="border border-slate-800 bg-slate-800/30 rounded-xl p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    Skill Gaps
                  </p>

                  <p className="text-2xl font-bold text-slate-100 mt-2">
                    {skillGaps.length}
                  </p>

                  <p className="text-[10px] text-slate-600 mt-1">
                    areas identified
                  </p>
                </div>
              </div>

              {/* Mobile Resume Button */}

              <button
                onClick={() => downloadResume(interviewId)}
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-3
                  mt-3
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                "
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <span>✦</span>
                    Generate Tailored Resume
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-600 text-center mt-2">
                AI-optimized for this job description
              </p>
            </div>

            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <div className="p-4 sm:p-5 md:p-7">
              {/* ================================================= */}
              {/* QUESTIONS */}
              {/* ================================================= */}

              {activeSection !== "roadmap" && (
                <div className="space-y-3">
                  {questions.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      No questions available.
                    </div>
                  ) : (
                    questions.map((item, index) => {
                      const questionId = item._id || index;
                      const isOpen = openQuestion === questionId;

                      return (
                        <div
                          key={questionId}
                          className={`border rounded-xl overflow-hidden transition ${
                            isOpen
                              ? "border-indigo-500/30 bg-slate-800/50"
                              : "border-slate-800 bg-slate-800/30"
                          }`}
                        >
                          {/* Question */}

                          <button
                            onClick={() =>
                              setOpenQuestion(isOpen ? null : questionId)
                            }
                            className="w-full text-left px-3 sm:px-4 py-4 flex items-start gap-3 sm:gap-4"
                          >
                            <span className="shrink-0 text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-1.5 rounded">
                              Q{index + 1}
                            </span>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-200 leading-6 break-words">
                                {item.question}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 text-slate-500 text-xs transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              ↓
                            </span>
                          </button>

                          {/* Answer */}

                          {isOpen && (
                            <div className="px-3 sm:px-4 pb-5">
                              <div className="border-t border-slate-700/70 pt-4 ml-0 sm:ml-10">
                                {/* Intention */}

                                {item.intention && (
                                  <div className="mb-5">
                                    <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                                      What the interviewer is looking for
                                    </p>

                                    <p className="text-xs text-slate-500 leading-5 break-words">
                                      {item.intention}
                                    </p>
                                  </div>
                                )}

                                {/* Answer */}

                                <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-3">
                                  Suggested Answer
                                </p>

                                <p className="text-sm text-slate-400 leading-7 break-words">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* ================================================= */}
              {/* PREPARATION PLAN */}
              {/* ================================================= */}

              {activeSection === "roadmap" && (
                <div className="space-y-4">
                  {preparationPlan.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      No preparation plan available.
                    </div>
                  ) : (
                    preparationPlan.map((day, index) => (
                      <div
                        key={day._id || index}
                        className="border border-slate-800 bg-slate-800/30 rounded-xl p-4 sm:p-5"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">
                            Day {day.day}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-slate-200">
                              {day.focus}
                            </h3>

                            {day.tasks?.length > 0 && (
                              <ul className="mt-3 space-y-2">
                                {day.tasks.map((task, taskIndex) => (
                                  <li
                                    key={taskIndex}
                                    className="flex items-start gap-2 text-xs text-slate-500 leading-5"
                                  >
                                    <span className="text-indigo-400 mt-0.5 shrink-0">
                                      •
                                    </span>

                                    <span className="break-words">{task}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ================================================= */}
              {/* MOBILE SKILL GAPS */}
              {/* ================================================= */}

              <div className="md:hidden mt-6 pt-6 border-t border-slate-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                  Skill Gaps
                </p>

                {skillGaps.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No significant skill gaps identified.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skillGaps.map((gap, index) => (
                      <div
                        key={gap._id || index}
                        className={`rounded-lg px-3 py-2 border ${
                          gap.severity === "high"
                            ? "bg-red-500/10 border-red-500/20 text-red-400"
                            : gap.severity === "medium"
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : "bg-green-500/10 border-green-500/20 text-green-400"
                        }`}
                      >
                        <p className="text-[11px] font-medium">{gap.skill}</p>

                        <p className="text-[9px] opacity-70 mt-1 capitalize">
                          {gap.severity} priority
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* ================================================= */}
          {/* RIGHT PANEL - DESKTOP ONLY */}
          {/* ================================================= */}

          <aside className="w-60 shrink-0 border-l border-slate-800 bg-slate-950/30 hidden xl:block">
            <div className="p-5">
              {/* Match Score */}

              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                Match Score
              </p>

              <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-slate-100">
                      {report.matchScore ?? 0}
                    </span>

                    <span className="text-xs text-slate-500 block">%</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-indigo-400 mt-4">
                {report.matchScore >= 80
                  ? "Strong match for this role"
                  : report.matchScore >= 60
                    ? "Good match with some gaps"
                    : "Areas need improvement"}
              </p>

              <div className="mt-6">
                <button
                  onClick={() => downloadResume(interviewId)}
                  disabled={loading}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-4
                    py-3
                    rounded-xl
                    bg-indigo-600
                    hover:bg-indigo-500
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                  "
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating Resume...
                    </>
                  ) : (
                    <>
                      <span>✦</span>
                      Generate Tailored Resume
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-600 text-center mt-2">
                  AI-optimized for this job description
                </p>
              </div>

              {/* Divider */}

              <div className="border-t border-slate-800 my-6" />

              {/* Skill Gaps */}

              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                Skill Gaps
              </p>

              <div className="space-y-2">
                {skillGaps.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No significant skill gaps identified.
                  </p>
                ) : (
                  skillGaps.map((gap, index) => (
                    <div
                      key={gap._id || index}
                      className={`rounded-lg px-3 py-2 border ${
                        gap.severity === "high"
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : gap.severity === "medium"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-green-500/10 border-green-500/20 text-green-400"
                      }`}
                    >
                      <p className="text-[11px] font-medium">{gap.skill}</p>

                      <p className="text-[9px] opacity-70 mt-1 capitalize">
                        {gap.severity} priority
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Interview;
