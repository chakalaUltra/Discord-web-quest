import { feedbacks, type Feedback, type InsertFeedback } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedbacks(): Promise<Feedback[]>;
}

export class DatabaseStorage implements IStorage {
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedback] = await db
      .insert(feedbacks)
      .values(insertFeedback)
      .returning();
    return feedback;
  }

  async getFeedbacks(): Promise<Feedback[]> {
    return await db.select().from(feedbacks);
  }
}

export const storage = new DatabaseStorage();
