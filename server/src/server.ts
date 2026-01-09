import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./db/db";

dotenv.config();

const PORT = process.env.PORT || 5001;


async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();