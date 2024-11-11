import mongoose, { Schema } from "mongoose";

const auctionTicketSchema = new Schema({
	event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
	seat: { type: String, required: true },
	startingBid: { type: Number, required: true },
	highestBid: { type: Number, default: 0 },
	highestBidder: { type: Schema.Types.ObjectId, ref: "User" },
	auctionEnd: { type: Date, required: true },
});

const AuctionTicket = mongoose.model("AuctionTicket", auctionTicketSchema);
export default AuctionTicket;
