import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const usePickedPresents = () => {
  const query = useQuery({
    queryKey: ["picked-presents"],
    queryFn: async () => {
      const response = await client.api.presents.$get();

      if (!response.ok) throw new Error("Failed to fetch picked presents");

      return response.json();
    },
  });

  return query;
};
