import express from "express";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", userRoutes);
app.use("/events", eventRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
