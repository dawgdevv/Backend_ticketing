import express from "express";
import {
	signup,
	login,
	update,
	logout,
} from "../controllers/user.controller.js";
import {
	signupValidation,
	loginValidation,
	updateValidation,
} from "../middlewares/user.validation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.post("/", updateValidation, update);
export default router;
