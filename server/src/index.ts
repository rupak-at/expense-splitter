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
import notificationRoutes from "./routes/notificationRoutes"

import {saveNotification} from "./utils/saveNotification"


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:3000", "http://localhost:3001"], 
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
app.use("/api", notificationRoutes)

server.listen(4000, () => {
    console.log("Server is running on port 4000");
})

const users = new Map();

io.on("connection", (socket) => {
    
    socket.on("user-online", (id) => {
        users.set(id, socket.id);
    })

    socket.on("join-group", (groupId) => {
        socket.join(groupId);
    })
    
    socket.on("new-expense", async (data, userId, groupId) => {

        const onlineIds = users.keys()
        const Ids = []
        for (const ids of onlineIds) {
            Ids.push(ids)
        }
        socket.to(groupId).emit("new-expense", data);

        saveNotification(data, Ids, groupId)
    })

    socket.on("disconnect", () => {
        users.forEach((value, key) => {
            if (value === socket.id) {
                users.delete(key);
            }
        })
    })
})