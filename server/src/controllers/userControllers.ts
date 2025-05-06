import { RequestHandler } from "express";
import { User } from "../models/userModels";
import { hashPassword } from "../utils/passwords";
import { checkPassword } from "../utils/passwords";
import { generateJWT } from "../utils/jwt";
import mongoose from "mongoose";

const registerUser:RequestHandler = async (req, res, ) => {
    try {

        const {fullName, userName, email, password} = req.body
        const existingUser = await User.findOne({email});

        if (existingUser) {
            res.status(400).json({success:false,message: "User already exists"});
            return;
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword
        });

        const nUser = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email
        }
        res.status(201).json({ success: true, user: nUser, message: "Register Successfully"});
        return
    } catch (error:any) {
        res.status(500).json({success: false,message: error.message});
        return
    }
}

const loginUser:RequestHandler = async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await User.findOne({email}).populate("groups");

        if (!user) {
            res.status(400).json({message: "User does not exist", success: false});
            return;
        }

        const isMatched = await checkPassword(password, user.password)

        if(!isMatched) {
            res.status(400).json({message: "Invalid credentials", success: false});
            return;
            
        }

        const token = generateJWT(user?._id as mongoose.Types.ObjectId);
        const {_id, fullName, userName, email: _email, groups} = user

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'strict'});
        res.status(200).json({success: true,user:{
            _id, fullName, userName, email: _email, groups
        }});
        return
        
    } catch (error: any) {
        console.error(error)
        res.status(500).json({message: error.message, success: false});
        return
    }
}

export {registerUser, loginUser}