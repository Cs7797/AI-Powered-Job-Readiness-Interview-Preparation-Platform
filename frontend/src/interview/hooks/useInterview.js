import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
  generateResume,
} from "../services/interview.api";

import { InterviewContext } from "../services/interview.context.jsx";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = useCallback(
    async ({ jobDescription, resumeFile, selfDescription }) => {
      setLoading(true);

      try {
        const response = await generateInterviewReport({
          jobDescription,
          resumeFile,
          selfDescription,
        });

        setReport(response.report);

        return response.report;
      } catch (error) {
        console.error("Failed to generate interview report:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const getReportById = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const response = await getInterviewReportById(id);

        setReport(response.report);

        return response.report;
      } catch (error) {
        console.error("Failed to fetch interview report:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport],
  );

  const getReports = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAllInterviewReports();

      setReports(response.reports);

      return response.reports;
    } catch (error) {
      console.error("Failed to fetch interview reports:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports]);

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

   const downloadResume = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const pdfBlob = await generateResume(id);

        const url = window.URL.createObjectURL(
          new Blob([pdfBlob], { type: "application/pdf" }),
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = "optimized-resume.pdf";

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to generate resume:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  return {
    loading,
    generateReport,
    getReportById,
    getReports,
    report,
    reports,
    downloadResume,
  };
};