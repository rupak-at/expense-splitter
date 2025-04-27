import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const generateJWT = (_id: mongoose.Types.ObjectId) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET as string, {expiresIn: '30d'})
    return token
}

export const verifyJWT = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string)