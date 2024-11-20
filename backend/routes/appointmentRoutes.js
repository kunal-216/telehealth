import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointmentControllers.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:appointmentId", updateAppointmentStatus);
router.delete("/:appointmentId", deleteAppointment);

export default router;
