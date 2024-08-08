import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { LISTS_QUERY_KEY } from "../lists-query-keys";

export const useGetUserLists = () => {
  const query = useQuery({
    queryKey: [LISTS_QUERY_KEY.USER_LISTS],
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
