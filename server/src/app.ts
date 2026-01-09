import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

export default app;
