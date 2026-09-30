import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview";

const Interview = () => {
  const { report, loading } = useInterview();

  const [activeSection, setActiveSection] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);

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
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
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
      icon: "</>",
      count: technicalQuestions.length,
    },
    {
      id: "behavioral",
      label: "Behavioral Questions",
      icon: "▱",
      count: behavioralQuestions.length,
    },
    {
      id: "roadmap",
      label: "Preparation Plan",
      icon: "➤",
      count: preparationPlan.length,
    },
  ];

  const questions =
    activeSection === "technical" ? technicalQuestions : behavioralQuestions;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-375 mx-auto">
        <div className="min-h-[calc(100vh-48px)] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex">
          {/* ================================================= */}
          {/* LEFT SIDEBAR */}
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

            <div className="px-5 md:px-7 py-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-slate-100">
                  {activeSection === "technical" && "Technical Questions"}

                  {activeSection === "behavioral" && "Behavioral Questions"}

                  {activeSection === "roadmap" && "Preparation Plan"}
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                  AI-generated based on your resume and target role
                </p>
              </div>

              {activeSection !== "roadmap" && (
                <span className="hidden sm:block text-[11px] text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
                  {questions.length} questions
                </span>
              )}
            </div>

            <div className="p-5 md:p-7">
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
                            className="w-full text-left px-4 py-4 flex items-start gap-4"
                          >
                            <span className="shrink-0 text-[10px] font-bold text-pink-400 bg-pink-500/10 px-2 py-1.5 rounded">
                              Q{index + 1}
                            </span>

                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-200 leading-6">
                                {item.question}
                              </p>
                            </div>

                            <span
                              className={`text-slate-500 text-xs transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            >
                              ↓
                            </span>
                          </button>

                          {/* Answer */}

                          {isOpen && (
                            <div className="px-4 pb-5">
                              <div className="border-t border-slate-700/70 pt-4 ml-10">
                                {/* Intention */}

                                {item.intention && (
                                  <div className="mb-5">
                                    <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-2">
                                      What the interviewer is looking for
                                    </p>

                                    <p className="text-xs text-slate-500 leading-5">
                                      {item.intention}
                                    </p>
                                  </div>
                                )}

                                {/* Answer */}

                                <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-3">
                                  Suggested Answer
                                </p>

                                <p className="text-sm text-slate-400 leading-7">
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
                        className="border border-slate-800 bg-slate-800/30 rounded-xl p-5"
                      >
                        <div className="flex gap-4">
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">
                            Day {day.day}
                          </div>

                          <div className="flex-1">
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
                                    <span className="text-indigo-400 mt-0.5">
                                      •
                                    </span>

                                    <span>{task}</span>
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
            </div>
          </main>

          {/* ================================================= */}
          {/* RIGHT PANEL */}
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
