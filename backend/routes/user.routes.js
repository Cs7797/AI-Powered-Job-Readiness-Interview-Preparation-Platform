import { Router } from "express";
import { registerUser, loginUser, logout, getMe } from "../controllers/user.controller.js";
import { authUser } from "../middleware/user.middleware.js";


const userRouter = Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logout)
userRouter.get("/get-me",authUser,getMe)

export default userRouter