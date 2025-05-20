// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db/db";
// import cookieParser from "cookie-parser";
// import { createServer } from "http";
// import { Server } from "socket.io";

// import userRoutes from "./routes/userRoutes"
// import groupRoutes from "./routes/groupRoutes"
// import expenseRoutes from "./routes/expenseRoutes"
// import splitRoutes from "./routes/splitRoutes"
// import notificationRoutes from "./routes/notificationRoutes"

// import {saveNotification} from "./utils/saveNotification"


// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin: ["http://localhost:3000", "http://localhost:3001"], 
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// })

// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
//     credentials: true
// }));
// app.use(cookieParser());

// connectDB();

// app.use("/api/user", userRoutes)
// app.use("/api", groupRoutes)
// app.use("/api", expenseRoutes)
// app.use("/api", splitRoutes)
// app.use("/api", notificationRoutes)

// server.listen(4000, () => {
//     console.log("Server is running on port 4000");
// })

// const users = new Map();

// io.on("connection", (socket) => {
    
//     socket.on("user-online", async(id) => {
//         users.set(id, socket.id);
//     })

//     socket.on("join-group", (groupId) => {
//         socket.join(groupId);
//     })
    
//     socket.on("new-expense", async (data, userId, groupId) => {

//         const onlineIds = users.keys()
//         const Ids = []
//         for (const ids of onlineIds) {
//             Ids.push(ids)
//         }
//         socket.to(groupId).emit("new-expense", data);

//         saveNotification(data, Ids, groupId)
//     })

//     socket.on("disconnect", () => {
//         users.forEach((value, key) => {
//             if (value === socket.id) {
//                 users.delete(key);
//             }
//         })
//     })
// })



import express from "express";
import cors from "cors";
import { connectDB } from "./db/db";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient, RedisClientType } from "redis"; // Import RedisClientType

import userRoutes from "./routes/userRoutes";
import groupRoutes from "./routes/groupRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import splitRoutes from "./routes/splitRoutes";
import notificationRoutes from "./routes/notificationRoutes";

import { saveNotification } from "./utils/saveNotification";

const app = express();
const server = createServer(app);

let redisClient: RedisClientType; // Declare redisClient without initializing

async function initializeRedis() {
    redisClient = createClient({
        url: "redis://localhost:6379",
    });
    redisClient.on("error", (err) => console.log(err));
    await redisClient.connect();
    console.log("Connected to Redis");
    return redisClient; // Return the connected client
}

// Initialize Redis connection
initializeRedis();

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(cookieParser());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api", groupRoutes);
app.use("/api", expenseRoutes);
app.use("/api", splitRoutes);
app.use("/api", notificationRoutes);

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});

const users = new Map<string, string>();

io.on("connection", (socket) => {

    socket.on("user-online", async (id) => {
        try {
            // Await the connection
            users.set(id, socket.id);
            await redisClient.set(id, socket.id); // Use the connected client
        } catch (error) {
            console.error("Error setting user online in Redis:", error);
        }
    });

    socket.on("join-group", (groupId) => {
        socket.join(groupId);
    });

    socket.on("new-expense", async (data, userId, groupId) => {

        const ids = await redisClient.keys("*");
        
        socket.to(groupId).emit("new-expense", data);

        saveNotification(data, ids, groupId);
    });

    socket.on("disconnect", () => {
        users.forEach((value, key) => {
            if (value === socket.id) {
                users.delete(key);
            }
        });
    });
});
