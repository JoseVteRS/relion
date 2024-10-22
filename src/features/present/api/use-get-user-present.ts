import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseGetUserPresentProps {
  presentId: string;
}

export const useGetUserPresent = ({ presentId }: UseGetUserPresentProps) => {
  const query = useQuery({
    enabled: !!presentId,
    queryKey: qk.presents.userPresentDetails(presentId!),
    queryFn: async () => {
      const response = await client.api.presents[":presentId"].$get({
        param: { presentId },
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
