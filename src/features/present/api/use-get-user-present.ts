import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

interface UseGetUserPresentProps {
  presentId: string;
}

export const useGetUserPresent = ({ presentId }: UseGetUserPresentProps) => {
  const query = useQuery({
    enabled: !!presentId,
    retry: false,
    queryKey: qk.presents.userPresentDetails(presentId!),
    queryFn: async () => {
      const response = await client.api.presents[":presentId"].$get({
        param: { presentId },
      });

      if (!response.ok && response.status === 401) {
        throw new Error("Unauthorized", { cause: response.status });
      }

      if (!response.ok) {
        throw new Error("Error al cargar el regalo");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
