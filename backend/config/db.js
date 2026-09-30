import mongoose from "mongoose";

export const connectToDb = async()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("Database Connected"));
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.error(error)
    }
}


