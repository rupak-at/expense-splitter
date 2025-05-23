import { required } from "joi";
import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    fullName: string;
    userName: String;
    email: string;
    password: string;
    groups?: mongoose.Schema.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}
const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    } ,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    groups:[{
        ref: "Group",
        type: mongoose.Schema.Types.ObjectId
    }]
}, {timestamps: true});

export const User = mongoose.model<IUser>("User", userSchema);