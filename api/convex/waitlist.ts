import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Join the waitlist for a project.
 * Silently deduplicates: re-joining an existing (email, project) pair
 * returns success without creating a second row.
 */
export const join = mutation({
  args: {
    email: v.string(),
    project: v.string(),
    ip: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email_project", (q) =>
        q.eq("email", args.email).eq("project", args.project)
      )
      .first();

    if (existing) {
      return { success: true, alreadyJoined: true };
    }

    await ctx.db.insert("waitlist", {
      email: args.email,
      project: args.project,
      createdAt: Date.now(),
      status: "active",
      ip: args.ip,
      userAgent: args.userAgent,
    });

    return { success: true, alreadyJoined: false };
  },
});

/**
 * List active waitlist entries for a project.
 * Useful for exporting signups or building admin views.
 */
export const listByProject = query({
  args: { project: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("waitlist")
      .withIndex("by_project", (q) => q.eq("project", args.project))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();
  },
});

/**
 * Unsubscribe an email from a project's waitlist.
 */
export const unsubscribe = mutation({
  args: {
    email: v.string(),
    project: v.string(),
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("waitlist")
      .withIndex("by_email_project", (q) =>
        q.eq("email", args.email).eq("project", args.project)
      )
      .first();

    if (!entry) {
      return { success: false, reason: "not_found" };
    }

    await ctx.db.patch(entry._id, { status: "unsubscribed" });
    return { success: true };
  },
});
