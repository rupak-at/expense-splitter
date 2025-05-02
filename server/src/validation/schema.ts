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

export const GroupCreationSchema = Joi.object({
    groupName: Joi.string().required().min(3).trim(),
    members: Joi.array().items(Joi.string().hex().length(24)).required(), //to validate mongoose id
    createdBy: Joi.string().required()
})

export const AddingMemberToGroupSchema = Joi.object({ 
    userId: Joi.array().items(Joi.string().hex().length(24)).required(),
})

export const ExpenseSchema = Joi.object({
    title: Joi.string().required().min(3).trim(),
    description: Joi.string().required().min(3).trim(),
    group: Joi.string().hex().length(24).required(),
    paidBy: Joi.string().hex().length(24).required(),
    amount: Joi.number().required(),
})