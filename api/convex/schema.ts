import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    project: v.string(),
    createdAt: v.number(),
    status: v.union(v.literal("active"), v.literal("unsubscribed")),
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_email_project", ["email", "project"])
    .index("by_project", ["project"])
    .index("by_created", ["createdAt"]),
});
