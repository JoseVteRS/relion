import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";

export const useGetPublicList = (listId?: string) => {
  const query = useQuery({
    enabled: !!listId,
    retry: false,
    queryKey: qk.lists.publicListDetails(listId!),
    queryFn: async () => {
      const response = await client.api.lists.list[":id"].$get({
        param: { id: listId },
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
