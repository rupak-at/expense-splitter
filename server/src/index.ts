import express from "express";
import cors from "cors";
import { connectDB } from "./db/db";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();


app.listen(4000, () => {
    console.log("Server is running on port 4000");
})