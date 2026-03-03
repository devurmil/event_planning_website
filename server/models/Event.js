import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["wedding", "corporate", "birthday", "concert", "anniversary"],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    features: {
        type: [String],
        default: [],
    },
    gallery: {
        type: [String],
        default: [],
    },
    pricing: {
        basic: { type: Number, default: 0 },
        premium: { type: Number, default: 0 },
        luxury: { type: Number, default: 0 },
    },
    timeline: [{
        step: String,
        description: String,
    }],
    isFeatured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Event", EventSchema);
