import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db.config";

dotenv.config();

const PORT = process.env.PORT || 5000;


async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(PORT)
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();