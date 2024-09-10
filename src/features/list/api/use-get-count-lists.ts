import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";

export const useGetCountLists = () => {
  const query = useQuery({
    queryKey: qk.lists.countByUser,
    queryFn: async () => {
      const response = await client.api.lists["count-by-user"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch count lists");
      }
      const { data: count } = await response.json();
      return count;
    },
  });

  return query;
};
