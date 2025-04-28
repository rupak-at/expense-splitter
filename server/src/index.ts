import express from "express";
import cors from "cors";
import { connectDB } from "./db/db";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes"
import groupRoutes from "./routes/groupRoutes"


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

app.use("/api/user", userRoutes)
app.use("/api", groupRoutes)

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})