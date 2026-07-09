// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import jobRoutes from './routes/jobRoutes.js';
// import applicationRoutes from './routes/applicationRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// require("dotenv").config();


// const mongoose = require("mongoose");

// const app = express();

// dotenv.config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err.message);
//   });
// connectDB();
// const app = express();
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// app.get('/', (_, res) => res.json({ message: 'AI Job Portal API running' }));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/admin', adminRoutes);
// app.use((err, _, res, __) => res.status(500).json({ message: err.message || 'Server error' }));
// app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (_, res) => {
  res.json({ message: "AI Job Portal API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
