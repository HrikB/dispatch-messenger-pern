import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "This field is required",
      "string.pattern.base":
        "This field cannot have spaces, numbers, or symbols",
    }),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "This field is required",
      "string.pattern.base":
        "This field cannot have spaces, numbers, or symbols",
    }),
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "This field is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "This field is required",
    "string.min": "Password must be at least 8 characters",
  }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({
      "string.empty": "This field is required",
      "any.only": "Passwords must be the same",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "This field is required",
    "string.email": "Please enter a valid email",
  }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "This field is required" }),
});

export const updateSchema = Joi.object({
  email: Joi.string().email().lowercase().messages({
    "string.email": "Please enter a valid email",
  }),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base":
        "This field cannot have spaces, numbers, or symbols",
    }),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base":
        "This field cannot have spaces, numbers, or symbols",
    }),
});
