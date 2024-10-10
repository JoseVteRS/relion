import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseGetFavoriteProps {
  listId: string;
}

export const useGetFavorite = ({ listId }: UseGetFavoriteProps) => {
  const query = useQuery({
    enabled: !!listId,
    queryKey: qk.favorite.getFavorite(listId),
    queryFn: async () => {
      const response = await client.api.favorites[":listId"].$get({
        param: {
          listId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favorite");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
