import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://nishantraj:nishant24@cluster0.0p0yq.mongodb.net/auth_db?retryWrites=true&w=majority",
			{}
		);
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection failed", error);
		process.exit(1);
	}
};
export default connectDB;
