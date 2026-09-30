import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../interview/hooks/useInterview.js";

const InterviewDashboard = () => {
  const navigate = useNavigate();

  const { reports, getReports, loading } = useInterview();

  useEffect(() => {
    getReports();
  }, [getReports]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold">Interview Preparation</h1>

            <p className="text-sm text-slate-500 mt-2">
              Prepare for your next opportunity with AI-powered insights.
            </p>
          </div>

          <button
            onClick={() => navigate("/interview/new")}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition"
          >
            + New Interview
          </button>
        </div>

        {/* Previous Interviews */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-300">
              Previous Interviews
            </h2>

            <span className="text-xs text-slate-600">
              {reports.length} reports
            </span>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-16 text-slate-500">
              Loading your interviews...
            </div>
          )}

          {/* Empty */}
          {!loading && reports.length === 0 && (
            <div className="border border-dashed border-slate-800 rounded-2xl py-16 text-center">
              <p className="text-sm text-slate-400">
                You haven't created an interview yet.
              </p>

              <button
                onClick={() => navigate("/interview/new")}
                className="mt-4 text-sm text-indigo-400 hover:text-indigo-300"
              >
                Create your first interview →
              </button>
            </div>
          )}

          {/* Reports */}
          {!loading && reports.length > 0 && (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="border border-slate-800 bg-slate-900/50 rounded-xl p-5 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">
                      {report.role || "Interview Report"}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-600">Match</p>

                      <p className="text-sm font-semibold text-indigo-400">
                        {report.matchScore ?? 0}%
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(`/interview/${report._id}`)}
                      className="text-sm text-slate-400 hover:text-white transition"
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewDashboard;
