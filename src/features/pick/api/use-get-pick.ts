import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetPick = (presentId: string, listId: string) => {
  const query = useQuery({
    queryKey: qk.picks.pick(presentId, listId),
    queryFn: async () => {
      const response = await client.api.picks[":presentId"].$get({
        param: { presentId },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { data } = await response.json();
      return data;
    },
    retry: false,
  });

  return query;
};
