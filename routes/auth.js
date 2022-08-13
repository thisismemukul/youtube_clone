import express from "express";
import { signup, signin, signout, verifytoken, googleAuth } from "../controllers/auth.js";

const router = express.Router();

//CREATE A NEW USER
router.post("/signup", signup);
//SIGN IN
router.post("/signin", signin);
//VERIFY TOKEN
router.get("/:id/verify/:token/", verifytoken);
//GOOGLE AUTH
router.post("/signout", signout);
//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;