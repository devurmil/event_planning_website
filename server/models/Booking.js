import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    eventTitle: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    duration: { type: Number },
    guestCount: { type: Number },
    venueName: { type: String },
    city: { type: String },
    locationType: { type: String, enum: ['indoor', 'outdoor'] },
    packageType: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    services: {
        decoration: { type: Boolean, default: false },
        catering: { type: Boolean, default: false },
        photography: { type: Boolean, default: false },
        music: { type: Boolean, default: false },
        lighting: { type: Boolean, default: false },
        hosting: { type: Boolean, default: false },
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
