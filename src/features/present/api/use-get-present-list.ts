import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPresentList = (listId?: string) => {
  const query = useQuery({
    queryKey: qk.presents.publicPresentsInList(listId!),
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
