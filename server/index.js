import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

const app = express();
dotenv.config();
const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("connected to mongo");
    }).catch(err => {
        console.log(err);
    });
}
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.listen(8800, () => {
    connect()
    console.log("Server is running on port 8800");
});