import express from "express";
import Appointment from "../model/appointment.js";
import Doctor from "../model/doctor.js";

const router = express.Router();

const APPOINTMENT_DURATION = 30; // minutes

// Utility: convert HH:MM to total minutes
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

// @route   POST /api/booking/book
// @desc    Book an appointment
router.post("/book", async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 1️⃣ Check doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    if (!doctor.availability) {
      return res.status(400).json({
        success: false,
        message: "Doctor availability not set"
      });
    }

    // Availability format example: "10:00-18:00"
    const [startAvail, endAvail] = doctor.availability.split("-");

    const requestedStart = timeToMinutes(time);
    const requestedEnd = requestedStart + APPOINTMENT_DURATION;

    const availStart = timeToMinutes(startAvail);
    const availEnd = timeToMinutes(endAvail);

    // 2️⃣ Validate availability
    if (
      requestedStart < availStart ||
      requestedEnd > availEnd
    ) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available at this time"
      });
    }

    // 3️⃣ Check for overlapping appointments
    const existingAppointments = await Appointment.find({
      doctorId,
      date
    });

    for (const appt of existingAppointments) {
      const apptStart = timeToMinutes(appt.time);
      const apptEnd = apptStart + APPOINTMENT_DURATION;

      const isClashing =
        requestedStart < apptEnd &&
        requestedEnd > apptStart;

      if (isClashing) {
        return res.status(409).json({
          success: false,
          message: "This slot is already booked"
        });
      }
    }

    // 4️⃣ Create appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
});

export default router;
