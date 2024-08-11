import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { qk } from "@/lib/query-keys";

export const useGetUserPresents = () => {
  const query = useQuery({
    queryKey: qk.presents.userPresents,
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
