import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";

export const useGetUserLists = () => {
  const query = useQuery({
    queryKey: qk.lists.userLists,
    queryFn: async () => {
      const response = await client.api.lists.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
