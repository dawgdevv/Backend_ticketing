import Ticket from "../models/tickets.model.js";
import User from "../models/user.model.js";
import Event from "../models/events.model.js";

export const bookTicket = async (req, res) => {
	const { eventId, quantity, seats } = req.body;
	const userId = req.user.id; // User ID from the authenticated user
	console.log("Booking ticket for user:", userId); // Add this line to log the user ID
	console.log("Event ID:", eventId);

	try {
		// Find the event by ID
		// Add this line to log the event ID
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
