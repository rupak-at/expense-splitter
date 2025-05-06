import express from "express";
import cors from "cors";
import { connectDB } from "./db/db";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes"
import groupRoutes from "./routes/groupRoutes"
import expenseRoutes from "./routes/expenseRoutes"
import splitRoutes from "./routes/splitRoutes"


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true
}));
app.use(cookieParser());

connectDB();

app.use("/api/user", userRoutes)
app.use("/api", groupRoutes)
app.use("/api", expenseRoutes)
app.use("/api", splitRoutes)

server.listen(4000, () => {
    console.log("Server is running on port 4000");
})


io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);
})