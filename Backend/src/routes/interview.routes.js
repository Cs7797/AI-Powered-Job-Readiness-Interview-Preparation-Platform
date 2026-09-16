const express= require("express")
const authMiddleware=require("../middlewares/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middlewares/file.middleware")
const interviewRouter= express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description ,resume pdf and  job description
 * @access PRIVATE
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)


/**
 * @route GET/interview/report/:interviewId
 * @description gets the interview report by id
 * @access PRIVATE
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET/api/interview
 * @description get all interview reports by user
 * @access PRIVATE
 */
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

module.exports=interviewRouter