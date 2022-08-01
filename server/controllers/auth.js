import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

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
        const user = await User.findOne(req.body.username ? { username: req.body.username } : { email: req.body.email });
        if (!user) return next(createError(404, "User not found"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials"));
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...userData } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).status(200).json(userData);
    } catch (err) {
        next(err);
    }
}


export const googleAuth = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};