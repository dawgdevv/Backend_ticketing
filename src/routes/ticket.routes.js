import express from "express";
import { bookTicket, resellTicket } from "../controllers/ticket.controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/book", authenticateUser, bookTicket);
router.post("/resell", authenticateUser, resellTicket);

export default router;
