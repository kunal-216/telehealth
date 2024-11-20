import Appointment from "../models/appointmentModel.js";

export const createAppointment = async (req, res) => {
    const { patient, doctor, date, time, notes } = req.body;

    try {
        if (!patient || !doctor || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const appointment = new Appointment({
            patient,
            doctor,
            date,
            time,
            notes,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create appointment" });
    }
};

export const getAppointments = async (req, res) => {
    const { userId, role } = req.query;

    try {
        let filter = {};
        if (role === "patient") filter.patient = userId;
        if (role === "doctor") filter.doctor = userId;

        const appointments = await Appointment.find(filter)
            .populate("patient", "name email")
            .populate("doctor", "name email")
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
};

export const updateAppointmentStatus = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(updatedAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update appointment status" });
    }
};

export const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete appointment" });
    }
};
