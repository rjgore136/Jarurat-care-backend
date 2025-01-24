import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";

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
app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to the Jarurat Care API! Below are the available endpoints:",
    endpoints: [
      {
        method: "POST",
        route: "/api/resources/create",
        description: "Create a new resource in the database.",
      },
      {
        method: "GET",
        route: "/api/resources/all",
        description: "Get all resources from the database.",
      },
      {
        method: "GET",
        route: "/api/resources/byId/:id",
        description: "Get a resource by its unique ID.",
      },
      {
        method: "PUT",
        route: "/api/resources/update/:id",
        description: "Update a resource by its ID.",
      },
      {
        method: "DELETE",
        route: "/api/resources/delete/:id",
        description: "Delete a resource by its ID.",
      },
      {
        method: "POST",
        route: "/api/auth/register",
        description: "Register a new user.",
      },
      {
        method: "POST",
        route: "/api/auth/login",
        description: "Login to get a JWT token.",
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
