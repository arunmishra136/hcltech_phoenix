import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Patient from "../model/patients.js"
import { authPatient } from "../middleware/authPatient.js";

const router = Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const patient = await Patient.create({
      name,
      email,
      password: hashed
    });

    // Create JWT
    const token = jwt.sign(
      { id: patient._id, role: "patient" },
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
      message: "Patient registered & logged in",
      patient: {
        id: patient._id,
        email: patient.email,
        name: patient.name
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const match = await bcrypt.compare(password, patient.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: patient._id, role: "patient" },
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
      message: "Patient login successful",
      patient: {
        id: patient._id,
        email: patient.email,
        name: patient.name
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Patient logout successful" });
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
