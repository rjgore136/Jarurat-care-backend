import Joi from "joi";

// Validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate the request body
    if (error) {
      const errors = error.details.map((detail) => detail.message); // Extract error messages
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }
    next();
  };
};
