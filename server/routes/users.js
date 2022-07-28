import express from "express";
import { updateUser, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);
//delete user
router.delete("/:id", deleteUser);

//get a user 
router.get("/find/:id", deleteUser);

//subscribe to a user
router.put("/sub/:id", deleteUser);

//unsubscribe from a user
router.put("/unsub/:id", deleteUser);

//like a video 
router.put("/like/:videoId", deleteUser);

//dislike a video 
router.put("/dislike/:videoId", deleteUser);

export default router;