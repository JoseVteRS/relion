import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPresentList = (listId?: string) => {
  const query = useQuery({
    queryKey: ["presents-list", listId],
    retry: false,
    queryFn: async () => {
      const response = await client.api.presents["list-presents"][
        ":listId"
      ].$get({
        param: {
          listId: listId,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
