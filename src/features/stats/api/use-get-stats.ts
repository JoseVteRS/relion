import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
  const query = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await client.api.stats.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      return await response.json();
    },
  });

  return query;
};
