import express from "express";
import { signup, login, update } from "../controllers/user.controller.js";
import {
	signupValidation,
	loginValidation,
	updateValidation,
} from "../middlewares/user.validation.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/update", updateValidation, update);
export default router;
