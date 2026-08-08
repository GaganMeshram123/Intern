import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import promptRoutes from "./routes/promptRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();


// ==============================
// MIDDLEWARE
// ==============================

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",
  }),
);

app.use(express.json());



app.get("/", (req, res) => {
//   console.log(req);
  res.json({
    success: true,
    message:
      "AI Prompt Library API is running",
  });
//   console.log(res)
});



app.use(
  "/api/prompts",
  promptRoutes
);


// ==============================
// ERROR HANDLER
// ==============================

app.use(errorMiddleware);


// ==============================
// START SERVER
// ==============================

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
await connectDB();
// ZBF5D6b49rvRBhQc
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
};

startServer();