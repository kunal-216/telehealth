import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

app.use("/", (req, res) => {
    res.send("Hello from Server");
});

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});