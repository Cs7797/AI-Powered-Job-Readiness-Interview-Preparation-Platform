import express from "express"
import userRouter from "../routes/user.routes.js"
import cookieParser from "cookie-parser" 
import cors from "cors"
import { interviewRouter } from "../routes/interview.routes.js"

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

/* ROUTES */
app.use("/api/user", userRouter)
app.use("/api/interview",interviewRouter)

export default app