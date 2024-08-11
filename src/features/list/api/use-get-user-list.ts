import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";

export const useGetUserList = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: qk.lists.userListDetails(id!),
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
