import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { PRESENTS_QUERY_KEY } from "../presents-query-keys";

export const useGetUserPresent = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [PRESENTS_QUERY_KEY.USER_PRESENT_ID, { id }],
    queryFn: async () => {
      const response = await client.api.presents[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch present");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
