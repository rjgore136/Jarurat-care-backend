import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { apiRouteInfo } from "./controllers/homeController.js";

//routes
import authRoutes from "./routes/authRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);

// Use the error handling middleware
app.use(errorHandler);

// "/" endpoint for API documentation
app.get("/", apiRouteInfo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
