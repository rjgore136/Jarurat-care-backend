import Joi from "joi";

// Resource Validation Schema
export const resourceValidationSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
  type: Joi.string()
    .valid("fundraising", "medical aid", "education drive", "volunteering")
    .required(),
  beneficiaryCount: Joi.number().integer().min(1).required(),
  fundGoal: Joi.number().integer().min(1).required(),
  fundRaised: Joi.number().integer().min(0), // Optional
});
