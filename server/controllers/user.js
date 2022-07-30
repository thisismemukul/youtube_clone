import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async(req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true, useFindAndModify: false })
            res.status(200).json(updatedUser);
        } catch (error) {

        }
    } else {
        return next(createError(403, 'You are not authorized to update this user'));
    }
}
export const deleteUser = async(req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted");
        } catch (error) {

        }
    } else {
        return next(createError(403, 'You are not authorized to delete this user'));
    }
}
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const subscribe = async(req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription Successful");
    } catch (err) {
        next(err);
    }
}
export const unsubscribe = async(req, res, next) => {
    try {
        await User.findById(req.user.id, {
            $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription Successful");
    } catch (err) {
        next(err);
    }
}
export const like = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        }, { useFindAndModify: false })
        res.status(200).json("Video liked");
    } catch (err) {
        next(err);
    }
}
export const dislike = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        }, { useFindAndModify: false })
        res.status(200).json("Video disliked");
    } catch (err) {
        next(err);
    }
}