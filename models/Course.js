import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
});

export default mongoose.model("Course", CourseSchema);
