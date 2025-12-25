import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  rating: serial("rating").notNull(), // 1-5
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedbacks).pick({
  message: true,
  rating: true,
});

export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
