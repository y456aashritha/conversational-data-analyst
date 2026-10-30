
import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "10kb" }));

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Banking Analytics API is running"
  });
});

// Chat API
app.use("/api/chat", chatRoutes);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
