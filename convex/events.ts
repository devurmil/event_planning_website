import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getEventsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getFeaturedEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .take(6);
  },
});

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createBooking = mutation({
  args: {
    eventId: v.id("events"),
    clientName: v.string(),
    clientEmail: v.string(),
    clientPhone: v.string(),
    eventDate: v.string(),
    guestCount: v.number(),
    package: v.string(),
    budget: v.number(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
    });
  },
});

export const getTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

export const getServices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services").collect();
  },
});

export const getTeam = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("team").collect();
  },
});
