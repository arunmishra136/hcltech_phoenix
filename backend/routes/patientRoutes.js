import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Patient from "../model/patients.js"
import { authPatient } from "../middleware/authPatient.js";

const router = Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization, experience } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashed,
      specialization,
      experience
    });

    // Create JWT
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(token);

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with https
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({
      message: "Doctor registered & logged in",
      doctor: {
        id: doctor._id,
        email: doctor.email,
        name: doctor.name
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const match = await bcrypt.compare(password, doctor.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({
      message: "Doctor login successful",
      doctor: {
        id: doctor._id,
        email: doctor.email,
        name: doctor.name,
        specialization: doctor.specialization
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful — delete token on client" });
});


router.get("/profile", authPatient, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select("-password");
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/profile", authPatient, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.patient.id, req.body, {
      new: true,
    }).select("-password");

    res.json({ message: "Profile updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
