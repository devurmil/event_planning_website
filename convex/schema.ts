import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  events: defineTable({
    title: v.string(),
    category: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    imageUrl: v.string(),
    gallery: v.array(v.string()),
    pricing: v.object({
      basic: v.number(),
      premium: v.number(),
      luxury: v.number(),
    }),
    features: v.array(v.string()),
    timeline: v.array(v.object({
      step: v.string(),
      description: v.string(),
    })),
    isFeatured: v.boolean(),
  }).index("by_category", ["category"]),

  bookings: defineTable({
    eventId: v.id("events"),
    clientName: v.string(),
    clientEmail: v.string(),
    clientPhone: v.string(),
    eventDate: v.string(),
    guestCount: v.number(),
    package: v.string(),
    budget: v.number(),
    message: v.string(),
    status: v.string(), // pending, confirmed, cancelled
  }).index("by_status", ["status"]),

  testimonials: defineTable({
    clientName: v.string(),
    clientImage: v.string(),
    rating: v.number(),
    review: v.string(),
    eventType: v.string(),
  }),

  services: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    features: v.array(v.string()),
  }),

  team: defineTable({
    name: v.string(),
    position: v.string(),
    image: v.string(),
    bio: v.string(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
