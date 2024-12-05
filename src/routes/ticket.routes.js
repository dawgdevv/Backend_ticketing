import express from "express";
import {
	bookTicket,
	resellTicket,
	getresellTickets,
	buyresellTickets,
} from "../controllers/ticket.controller.js";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/book", authenticateUser, bookTicket);
router.post("/resell", authenticateUser, resellTicket);
router.get("/marketplace", authenticateUser, getresellTickets);
router.post("/purchase", authenticateUser, buyresellTickets);
export default router;
