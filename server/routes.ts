import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Feedback Routes
  app.post(api.feedback.create.path, async (req, res) => {
    try {
      const input = api.feedback.create.input.parse(req.body);
      const feedback = await storage.createFeedback(input);
      res.status(201).json(feedback);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      throw err;
    }
  });

  app.get(api.feedback.list.path, async (req, res) => {
    const list = await storage.getFeedbacks();
    res.json(list);
  });

  return httpServer;
}
