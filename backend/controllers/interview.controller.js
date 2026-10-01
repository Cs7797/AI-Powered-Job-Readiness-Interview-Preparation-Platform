import "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../services/ai.service.js";
import { interviewReport } from "../models/report.model.js";
import { generateResumePdf } from "../services/ai.service.js";
import { generatePdfFromHtml } from "../services/pdf.service.js";

export const generateReport = async (req, res) => {
  try {
    const resumeContent = await new PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    const { selfDescription, jobDescription } = req.body;
    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });
    console.log("AI OUTPUT:");
    console.log(interviewReportByAi);
    const report = await interviewReport.create({
      user: req.user,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
    });

    return res
      .status(201)
      .json({ message: "Interview report generated", success: true, report });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getReport = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const report = await interviewReport.findById(interviewId);
    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Report fetched successfully", success: true, report });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await interviewReport
      .find({ user: req.user })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v " +
          "-technicalQuestions -behavioralQuestions " +
          "-skillGaps -preparationPlan",
      );

    return res.status(200).json({
      message: "Interview reports fetched successfully",
      success: true,
      reports,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const generateResume = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await interviewReport.findOne({
      _id: interviewId,
      user: req.user,
    });

    if (!interview) {
      return res.status(404).json({
        message: "Interview report not found",
        success: false,
      });
    }

    // Step 1: Generate ATS-optimized HTML using Gemini
    const resumeHtml = await generateResumePdf(
      interview.resume,
      interview.jobDescription,
      interview.selfDescription,
    );

    // Step 2: Convert the generated HTML into PDF
    const pdf = await generatePdfFromHtml(resumeHtml);

    // Step 3: Send PDF to browser
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="optimized-resume.pdf"',
      "Content-Length": pdf.length,
    });

    return res.send(pdf);
  } catch (error) {
    console.error("Resume generation error:", error);

    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
