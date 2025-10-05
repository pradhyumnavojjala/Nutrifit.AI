import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  plans: defineTable({
    dietPlan: v.object({
      dailyCalories: v.float64(),
      meals: v.array(
        v.object({
          foods: v.array(v.string()),
          name: v.string(),
        })
      ),
    }),
    isActive: v.boolean(),
    name: v.string(),
    
    // CRITICAL FIX: Change v.id("users") to v.string()
    userId: v.string(), 
    
    workoutPlan: v.object({
      exercises: v.array(
        v.object({
          day: v.string(),
          routines: v.array(
            v.object({
              description: v.optional(v.string()),
              duration: v.optional(v.string()),
              exercises: v.optional(v.array(v.string())),
              name: v.string(),
              reps: v.optional(v.float64()),
              sets: v.optional(v.float64()),
            })
          ),
        })
      ),
      schedule: v.array(v.string()),
    }),
  })
    .index("by_active", ["isActive"])
    // The index is now correctly built on a string
    .index("by_user_id", ["userId"]), 
    
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    name: v.string(),
  }).index("by_clerk_id", ["clerkId"]),
});