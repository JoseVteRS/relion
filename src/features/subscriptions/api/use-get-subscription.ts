import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: qk.subscription.get,
    queryFn: async () => {
      const response = await client.api.subscriptions["current"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
