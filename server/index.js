import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("EventSphere API is running");
});

// Auth Route
app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name,
        picture,
        googleId,
      });
      await user.save(); // Initially create as regular user
    } else {
      // Update user info just in case
      user.name = name;
      user.picture = picture;
      await user.save();
    }

    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
