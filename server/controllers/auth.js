import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from "../error.js";

export const signup = async(req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User({...req.body, password: hash });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        next(err);
    }
}
export const signin = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username } || { email: req.body.email });
        if (!user) return next(createError(404, "User not found"));
    } catch (err) {
        next(err);
    }
}