import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { PRESENTS_QUERY_KEY } from "../presents-query-keys";

export const useGetUserPresents = () => {
  const query = useQuery({
    queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
    queryFn: async () => {
      const response = await client.api.presents.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch presents");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
