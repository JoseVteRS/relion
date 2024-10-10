import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetFavorites = (userId?: string) => {
  const query = useQuery({
    enabled: !!userId,
    queryKey: qk.favorite.getFavoritesByUserId(userId!),
    queryFn: async () => {
      const response = await client.api.favorites.$get();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
