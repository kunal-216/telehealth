import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

const registerUser = async (req, res) => {
    const { role, name, email, password } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        if (!email || !password || !name || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            role,
            name,
            email,
            password: hashedPassword,
            image,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ token, message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

export { loginUser, registerUser, getUserDetails };
