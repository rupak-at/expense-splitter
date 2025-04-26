import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Database connected")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}