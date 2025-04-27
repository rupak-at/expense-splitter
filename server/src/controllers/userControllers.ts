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
            res.status(400).json({error: "User already exists"});
            return;
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword
        });
        res.status(201).json(user);
        return
    } catch (error:any) {
        res.status(500).json({error: error.message});
        return
    }
}

const loginUser:RequestHandler = async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await User.findOne({email});

        if (!user) {
            res.status(400).json({error: "User does not exist"});
            return;
        }

        const isMatched = await checkPassword(password, user.password)

        if(!isMatched) {
            res.status(400).json({error: "Invalid credentials"});
            return;
        }

        const token = generateJWT(user?._id as mongoose.Types.ObjectId);
        const {_id, fullName, userName, email: _email, groups} = user

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).json({user:{
            _id, fullName, userName, email: _email, groups
        }});
        return
        
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: error.message});
        return
    }
}

export {registerUser, loginUser}