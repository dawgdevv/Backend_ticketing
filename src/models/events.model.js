import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
	name: { type: String, required: true },
	date: { type: Date, required: true },
	location: { type: String, required: true },
	description: { type: String },
	tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
	auctionTickets: [{ type: Schema.Types.ObjectId, ref: "AuctionTicket" }],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;