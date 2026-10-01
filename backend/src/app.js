import express from "express";
import userRouter from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { interviewRouter } from "../routes/interview.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "CareerLens API is running",
  });
});

app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

export default app;
