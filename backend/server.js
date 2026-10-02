import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./config/db.js";

async function handler(req, res) {
  try {
    await connectToDb();

    return app(req, res);
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    try {
      await connectToDb();
      console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  });
}

export default handler;
