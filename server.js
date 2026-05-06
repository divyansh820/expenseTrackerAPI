import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import incomeRouter from "./routes/incomeRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";

const app = express();

// MIDDLEWARE
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://expense-tracker-seven-cyan-82.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
await connectDB();

// ROUTES
app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

export default app;