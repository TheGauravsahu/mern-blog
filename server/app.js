import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

connectDB();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(process.env.FRONTEND_URL));

app.get("/", (req, res) => {
  res.send("Blog api,");
});

app.use("/api/users", userRoutes);

export default app;
