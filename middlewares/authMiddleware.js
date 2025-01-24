import User from "../models/user.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  // console.log("Inside protect middleware");
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);
    // console.log("protect");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id); // Retrieve user by ID from JWT

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user info to the request object

    next();
  } catch (error) {
    // console.log(error);
    next(error);
    res.status(401).json({ message: "Not authorized" });
  }
};

export default protect;
