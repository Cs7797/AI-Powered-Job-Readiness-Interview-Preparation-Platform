import mongoose from "mongoose";

let connectionPromise = null;

export const connectToDb = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // Connection is already being established
  if (connectionPromise) {
    await connectionPromise;
    return;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connection established");
    })
    .catch((error) => {
      connectionPromise = null;
      console.error("MongoDB connection failed:", error);
      throw error;
    });

  await connectionPromise;
};
