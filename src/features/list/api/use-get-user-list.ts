import { useQuery } from "@tanstack/react-query";
import { LISTS_QUERY_KEY } from "../lists-query-keys";
import { client } from "@/lib/hono";

export const useGetUserList = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [LISTS_QUERY_KEY.USER_LIST_ID, { id }],
    queryFn: async () => {
      const response = await client.api.lists[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch list");
      }
      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
