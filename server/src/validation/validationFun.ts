import { RequestHandler } from "express";
import { AddingMemberToGroupSchema, GroupCreationSchema, loginSchema, registerSchema } from "./schema";
import mongoose from "mongoose";

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

export const groupCreationValidation: RequestHandler = (req, res, next) => {
     const { error } = GroupCreationSchema.validate(req.body)
    if (error) {
         res.status(400).json({error:"Validation Error", msg: error?.details[0].message });
         return;
    }
     next();
}

export const addMemberToGroupValidation: RequestHandler = (req, res, next) => {

     const {id} = req.params;

     //id should be a mongoose id
     if (!mongoose.Types.ObjectId.isValid(id)) {
          res.status(400).json({error:"Validation Error", msg: "Invalid group id" });
          return;
     }
     const { error } = AddingMemberToGroupSchema.validate(req.body)
    if (error) {
         res.status(400).json({error:"Validation Error", msg: error?.details[0].message });
         return;
    }
     next();
}

export const validateExpense: RequestHandler = (req, res, next) => {
     const { error } = AddingMemberToGroupSchema.validate(req.body)
    if (error) {
         res.status(400).json({error:"Validation Error", msg: error?.details[0].message });
         return;
    }
     next();
}