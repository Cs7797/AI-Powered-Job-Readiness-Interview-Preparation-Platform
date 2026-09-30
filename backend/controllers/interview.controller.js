import {PDFParse} from "pdf-parse"
import { generateInterviewReport } from "../services/ai.service.js"
import {  interviewReport } from "../models/report.model.js"

export const generateReport = async (req,res) => {
    try {
        
        const resumeContent = await new PDFParse(Uint8Array.from(req.file.buffer)).getText()
        const { selfDescription, jobDescription } = req.body
        const interviewReportByAi = await generateInterviewReport({
            resume:resumeContent.text,
            selfDescription,
            jobDescription,
        })
        console.log("AI OUTPUT:");
        console.log(interviewReportByAi);
        const report = await interviewReport.create({
            user: req.user,
            resume:resumeContent.text ,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })
    
        return res.status(201).json({message:"Interview report generated",success:true,report})
    } catch (error) {
         return res.status(400).json({ message: error.message,success:false });
    }
}

export const getReport = async (req, res) => {
    try {
        const { interviewId } = req.params
        const report = await interviewReport.findById(interviewId)
        if (!report) {
            return res.status(404).json({ message: "Report not found", success: false })
        }
        return res.status(200).json({ message: "Report fetched successfully", success: true, report })
    }
    catch (error) {
        return res.status(400).json({ message: error.message, success: false })
    }
}

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
