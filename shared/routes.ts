import { z } from 'zod';
import { insertFeedbackSchema, feedbacks } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  feedback: {
    create: {
      method: 'POST' as const,
      path: '/api/feedback',
      input: insertFeedbackSchema,
      responses: {
        201: z.custom<typeof feedbacks.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/feedback',
      responses: {
        200: z.array(z.custom<typeof feedbacks.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
