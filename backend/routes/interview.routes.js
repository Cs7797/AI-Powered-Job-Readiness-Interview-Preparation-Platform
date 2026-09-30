import { Router } from "express"
import { authUser } from "../middleware/user.middleware.js"
import { generateReport,getReport,getAllReports } from "../controllers/interview.controller.js"
import { upload } from "../middleware/file.middleware.js"


export const interviewRouter = Router()

interviewRouter.post("/", authUser, upload.single("resume"), generateReport)
interviewRouter.get("/report/:interviewId", authUser, getReport)
interviewRouter.get("/all-reports",authUser, getAllReports)