import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertFeedback } from "@shared/routes";

// GET /api/feedback
export function useFeedbackList() {
  return useQuery({
    queryKey: [api.feedback.list.path],
    queryFn: async () => {
      const res = await fetch(api.feedback.list.path);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      return api.feedback.list.responses[200].parse(await res.json());
    },
  });
}

// POST /api/feedback
export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertFeedback) => {
      // API expects number for rating, form might give string if using basic inputs
      // but Zod schema handles it.
      const res = await fetch(api.feedback.create.path, {
        method: api.feedback.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.feedback.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit feedback");
      }
      return api.feedback.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.feedback.list.path] });
    },
  });
}
