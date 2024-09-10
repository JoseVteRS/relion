import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useTier = (tierId?: string) => {
  const query = useQuery({
    enabled: !!tierId,
    queryKey: ["tier", tierId],
    queryFn: async () => {
      const res = await client.api.subscriptions["tier"][":tierId"].$get({
        param: {
          tierId,
        },
      });

      if (!res.ok) {
        throw new Error("Error al obtener el tier");
      }
      const { data } = await res.json();
      return data;
    },
  });

  return query;
};
