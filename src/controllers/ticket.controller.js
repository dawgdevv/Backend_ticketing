import Ticket from "../models/tickets.model.js";
import User from "../models/user.model.js";
import Event from "../models/events.model.js";
import ResellTicket from "../models/resell.model.js";
import Marketplace from "../models/market.model.js";

export const bookTicket = async (req, res) => {
	const { eventId, quantity, seats } = req.body;
	const userId = req.user.id; // User ID from the authenticated user
	console.log("Booking ticket for user:", userId); //  log the user ID
	console.log("Event ID:", eventId);

	try {
		// Find the event by ID

		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		// Create a new ticket
		const ticket = new Ticket({
			event: eventId,
			owner: userId,
			price: event.price,
			quantity,
			seats,
			venue: event.location,
		});

		// Save the ticket to the database
		await ticket.save();

		// Update the user's ticket list
		const user = await User.findById(userId);
		user.tickets.push(ticket._id);
		await user.save();

		// Update the event's ticket list
		event.tickets.push(ticket._id);
		await event.save();

		// Populate the event field to include full event details (not just the ID)
		const populatedTicket = await Ticket.findById(ticket._id).populate("event");

		// Respond with success and include the populated ticket information
		res.status(201).json({
			message: "Ticket booked successfully",
			ticket: populatedTicket, // Send the populated ticket with event details
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const resellTicket = async (req, res) => {
	const { ticketId, price } = req.body;
	const userId = req.user.id;
	console.log("Reselling ticket for user:", userId);

	try {
		const ticket = await Ticket.findById(ticketId);
		console.log("Ticket:", ticket);
		if (!ticket) {
			return res.status(404).json({ message: "Ticket not found" });
		}

		const resellTicket = new ResellTicket({
			ticket: ticketId,
			seller: userId,
			price,
		});
		console.log("Resell ticket:", resellTicket);

		await resellTicket.save();

		const user = await User.findById(userId);
		user.resellTickets.push(resellTicket._id);
		await user.save();

		const marketplace = await Marketplace.findOne({});
		if (!marketplace) {
			const newMarketplace = new Marketplace({ tickets: [resellTicket._id] });
			await newMarketplace.save();
		} else {
			marketplace.tickets.push(resellTicket._id);
			await marketplace.save();
		}

		const populatedResellTicket = await ResellTicket.findById(
			resellTicket._id
		).populate("ticket");

		console.log("Populated resell ticket:", populatedResellTicket);

		res.status(201).json({
			message: "Ticket resold successfully",
			resellTicket: populatedResellTicket,
		});
	} catch (error) {
		console.error("Error reselling ticket:", error);
		res.status(500).json({ message: error.message });
	}
};
