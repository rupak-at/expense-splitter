import { RequestHandler } from "express";
import { loginSchema, registerSchema } from "./schema";

export const validateRegisterUser: RequestHandler = (req, res, next) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
         res.status(400).json({error:"Validation Error", msg: error?.details[0].message });
         return;
    }
     next();
}

export const loginValidation: RequestHandler = (req, res, next) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
         res.status(400).json({error:"Validation Error", msg: error?.details[0].message });
         return;
    }
     next();
}