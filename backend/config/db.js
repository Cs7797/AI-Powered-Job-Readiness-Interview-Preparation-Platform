import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connection established");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
