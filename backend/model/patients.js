import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  age: Number,
  allergies: [String],     // array of strings
  sleepTime: Number,
  exerciseTime: Number
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
