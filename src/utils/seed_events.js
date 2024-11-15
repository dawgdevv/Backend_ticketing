import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/events.model.js";

dotenv.config();

const Events = [
	{
		name: "Jaipur Literature Festival",
		date: new Date("2025-01-25"),
		location: "Jaipur, Rajasthan, India",
		description:
			"An annual literary extravaganza bringing together authors, thinkers, and readers from around the world.",
		price: 500, // Price in rupees
	},
	{
		name: "Rajasthan International Folk Festival",
		date: new Date("2025-10-01"),
		location: "Mehrangarh Fort, Jaipur, Rajasthan, India",
		description:
			"A celebration of Rajasthani and global folk music in the stunning backdrop of Mehrangarh Fort.",
		price: 1000, // Price in rupees
	},
	{
		name: "Jaipur Tech Expo",
		date: new Date("2025-03-15"),
		location:
			"Jaipur Exhibition and Convention Center, Jaipur, Rajasthan, India",
		description:
			"A tech event showcasing the latest innovations in software, hardware, and emerging technologies.",
		price: 1500, // Price in rupees
	},
	{
		name: "Pink City Food Carnival",
		date: new Date("2025-04-05"),
		location: "Central Park, Jaipur, Rajasthan, India",
		description:
			"A culinary festival celebrating diverse food cultures with top chefs and local cuisine.",
		price: 200, // Price in rupees
	},
	{
		name: "Jaipur Art and Craft Fair",
		date: new Date("2025-07-20"),
		location: "Jawahar Kala Kendra, Jaipur, Rajasthan, India",
		description:
			"An art fair promoting traditional Rajasthani crafts and modern art, with exhibitions and live art demos.",
		price: 300, // Price in rupees
	},
	{
		name: "Desert Rock Music Fest",
		date: new Date("2025-11-18"),
		location: "Jaipur Polo Grounds, Jaipur, Rajasthan, India",
		description:
			"A rock music festival featuring live performances by popular bands and indie musicians from India.",
		price: 800, // Price in rupees
	},
	{
		name: "Jaipur International Film Festival",
		date: new Date("2025-02-01"),
		location: "Inox Crystal Palm, Jaipur, Rajasthan, India",
		description:
			"A film festival showcasing cinema from around the world, with screenings, panel discussions, and workshops.",
		price: 1200, // Price in rupees
	},
];

const seedEvents = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://nishantraj:nishant24@cluster0.0p0yq.mongodb.net/auth_db?retryWrites=true&w=majority",
			{}
		);

		await Event.deleteMany();
		await Event.insertMany(Events);

		console.log("Events seeded successfully");
		process.exit();
	} catch (error) {
		console.error("Error seeding events", error);
		process.exit(1);
	}
};

seedEvents();
