import Ticket from "../models/tickets.model.js";
import User from "../models/user.model.js";
import Event from "../models/events.model.js";

export const bookTicket = async (req, res) => {
	const { eventId, quantity, seats } = req.body;
	const userId = req.user.id; // Assuming you have user ID in req.user from authentication middleware

	try {
		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		const ticket = new Ticket({
			event: eventId,
			owner: userId,
			price: event.price, // Assuming event has a price attribute
			quantity,
			seats,
			venue: event.location,
		});

		await ticket.save();

		const user = await User.findById(userId);
		user.tickets.push(ticket._id);
		await user.save();

		event.tickets.push(ticket._id);
		await event.save();

		res.status(201).json({ message: "Ticket booked successfully", ticket });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
