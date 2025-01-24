import Joi from "joi";

export const userValidationSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("Admin", "User").default("User"),
});
