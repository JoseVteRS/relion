import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPicks = () => {
  const query = useQuery({
    queryKey: ["picks"],
    queryFn: async () => {
      const response = await client.api.picks.$get();

      if (!response.ok) throw new Error("Failed to fetch picks");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
