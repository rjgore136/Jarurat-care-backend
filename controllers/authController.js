import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

//register controller
export const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: true,
        message: "User already exists!",
      });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//login controller
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //fetch the user details from db
    const user = await User.findOne({ email });

    //Check if we got any user with specified email or not
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    //Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //generate jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" } // Token expires in 30 minutes);
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};
