import Joi from "joi";

export const registerSchema = Joi.object({
    fullName: Joi.string().required().min(3).trim(),
    userName: Joi.string().required().min(3).regex(/^[a-zA-Z0-9_.-]+$/).trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
    confirmPassword: Joi.ref('password'),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
})