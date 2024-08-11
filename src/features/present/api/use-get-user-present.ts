import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { qk } from "@/lib/query-keys";

export const useGetUserPresent = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: qk.presents.userPresentDetails(id!),
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
