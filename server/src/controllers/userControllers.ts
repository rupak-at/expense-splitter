import { RequestHandler } from "express";
import { User } from "../models/userModels";
import bcrypt from "bcryptjs"
import { hashPassword } from "../utils/hashedPassword";
import { checkPassword } from "../utils/checkPassword";

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
    } catch (error:any) {
        res.status(500).json({error: error.message});
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

        //to do jwt
        res.status(200).json(user);
        
    } catch (error: any) {
        console.error(error)
        res.status(500).json({error: error.message});
    }
}

export {registerUser, loginUser}