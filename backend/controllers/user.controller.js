import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateToken = (userId) => {
    const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({message:"Pls provide username, email and password"})
        }
        const ifUserExists = await User.findOne({
            $or: [{ email }, { username }]
        })
    
        if (ifUserExists) {
            return res.status(400).json({message:"ACC already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
       const token=generateToken(newUser._id.toString())
        res.cookie("token", token,{httpOnly:true})
        
       return res.status(201).json({
         message: "User created successfully",
         success: true,
         user: {
           id: newUser._id.toString(),
           username: newUser.username,
           email: newUser.email,
         },
       });
    } catch (error) {
         return res.status(400).json({
           message: error.message,
           success: false,
         });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email,password } = req.body
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({message:"no user exists for given credentials"})
        }
        const isPassword = await bcrypt.compare(password, user.password)
        
        if (!isPassword) {
            return res.status(400).json({message:"Invalid user or password",success:false})
        }

        const token = generateToken(user._id.toString())
        res.cookie("token", token,{httpOnly:true});
        return res.status(200).json({
          message: "User Logged in!",
          success: true,
          user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          },
        });
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
    
}

export const logout = async (req, res)=>{
    res.clearCookie("token")
    return res.status(200).json({message:"logged out successfully"})
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
        res.status(200).json({
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}