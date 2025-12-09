import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/coursesdb";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

import Course from "./models/Course.js";

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID or server error" });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const newCourse = new Course({ title, description, instructor });
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Error creating course" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running! Use /courses");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
