import express from "express";
import Appointment from "../model/appointment.js";
import Doctor from "../model/doctor.js";

const router = express.Router();

const APPOINTMENT_DURATION = 30;

const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};


router.post("/book", async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

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

    const [startAvail, endAvail] = doctor.availability.split("-");

    const requestedStart = timeToMinutes(time);
    const requestedEnd = requestedStart + APPOINTMENT_DURATION;

    const availStart = timeToMinutes(startAvail);
    const availEnd = timeToMinutes(endAvail);

    if (
      requestedStart < availStart ||
      requestedEnd > availEnd
    ) {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available at this time"
      });
    }

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
