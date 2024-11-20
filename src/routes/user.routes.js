import express from "express";
import {
	signup,
	login,
	update,
	logout,
	getUserTickets,
} from "../controllers/user.controller.js";
import {
	signupValidation,
	loginValidation,
	updateValidation,
} from "../middlewares/user.validation.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.get("/mytickets", authenticateUser, getUserTickets);
router.post("/", updateValidation, update);
export default router;
