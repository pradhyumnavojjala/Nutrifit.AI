import {mutation} from "./_generated/server";
import {v} from "convex/values";

export const syncUsers = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        image: v.string(),
        clerkId: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
        .first();
        
        if (existingUser) return;

        return await ctx.db.insert("users", {
            ...args,
            clerkId: args.clerkId ?? ""
        });
    }
})