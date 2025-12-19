import { Router } from "express";
import Appointment from "../model/appointment.js";
import { authPatient } from "../middleware/authPatient.js";
import { authDoctor } from "../middleware/authDoctor.js";

const router = Router();


router.post("/", authPatient, async (req, res) => {
  try {
    const { doctorId, date, time, summary } = req.body;

    // Prevent duplicate booking
    const exists = await Appointment.findOne({ doctorId, date, time });
    if (exists) return res.status(400).json({ message: "Slot already booked" });

    const appointment = await Appointment.create({
      patientId: req.patient.id,
      doctorId,
      date,
      time,
      summary
    });

    res.json({ message: "Appointment booked", appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/patient", authPatient, async (req, res) => {
  const records = await Appointment.find({ patientId: req.patient.id })
    .populate("doctorId", "name specialization");
  res.json(records);
});


router.get("/doctor", authDoctor, async (req, res) => {
  const records = await Appointment.find({ doctorId: req.doctor.id })
    .populate("patientId", "name email age");
  res.json(records);
});

export default router;
