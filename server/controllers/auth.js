import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await User({...req.body, password: hash });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        //todo        
    }
}