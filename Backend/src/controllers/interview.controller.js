const pdfParse=require("pdf-parse")
const generateInterviewReport=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")

/**
 * 
 * @description controller to generate interview report based  on description
 */

async function generateInterviewReportController(req,res){

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription,jobDescription}=req.body 

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
        
    })

    const interviewReport= await interviewReportModel.create({
        user:req.user.id,
        resume :resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })
    
    res.status(201).json({
        message:"INTERVIEW REPORT GENERATED SUCCESSFULLY",
        interviewReport
    })
}

/**
 * @description Controller to get interview report by interview ID
 */
async function getInterviewReportByIdController(req,res){

    const{interviewId}=req.params

    const interviewReport= await interviewReportModel.findOne({_id:interviewId,user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"INTERVIEW REPORT NOT FOUND"
        })
    }

    res.status(200).json({
        message:"INTERVIEW REPORT FETCHED SUCCESSFULLY",
        interviewReport
    })

    

}

/**
 * @description controller to get the interview reports of the logged in user
 */

async function getAllInterviewReportsController(req,res){

    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"INTERVIEW REPORTS FETCHED SUCCESSFULLY",
        interviewReports
    })
}

module.exports={generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController}