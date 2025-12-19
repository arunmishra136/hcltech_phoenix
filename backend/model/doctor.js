import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  specialization: String,
  experience: Number,
  rating: Number,
  availability: String       
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);
