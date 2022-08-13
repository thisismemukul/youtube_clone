import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        console.log("connected to mongo");
    }).catch(err => {
        console.log(err);
    });
}
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        success: false,
        message,
        status
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connect()
    console.log(`App is running on port ${PORT}`);
});