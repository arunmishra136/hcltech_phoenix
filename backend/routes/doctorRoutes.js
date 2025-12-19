import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../model/doctor.js";
import { authDoctor } from "../middleware/authDoctor.js";

const router = Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization, experience } = req.body;
    console.log(name);

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

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true on HTTPS
      sameSite: "lax", 
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Doctor registered successfully",
      doctor: {
        id: doctor._id,
        email: doctor.email,
        name: doctor.name,
        specialization: doctor.specialization,
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/*
  @route   POST /api/doctors/login
*/
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

    // Set Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // HTTPS later
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
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
  @route   POST /api/doctors/logout
*/
router.post("/logout", (req, res) => {
  res.json({ message: "Doctor logout successful — delete token on client" });
});


router.get("/profile", authDoctor, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select("-password");
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/profile", authDoctor, async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.doctor.id, req.body, {
      new: true,
    }).select("-password");

    res.json({ message: "Profile updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
