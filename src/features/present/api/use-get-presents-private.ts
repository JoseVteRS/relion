import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";


export const useGetPresentsPrivate = () => {
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
