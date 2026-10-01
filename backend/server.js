import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./config/db.js";

await connectToDb();

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
  });
}

export default app;
