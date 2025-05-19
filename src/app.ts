import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./config/connectDb";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

export default app;
