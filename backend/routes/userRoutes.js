import express from "express";
import { loginUser, registerUser, getUserDetails } from "../controllers/userControllers.js"
import upload from "../middleware/upload.js"
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", upload.single("image"), registerUser);
router.get("/me", authMiddleware, getUserDetails); 

export default router;