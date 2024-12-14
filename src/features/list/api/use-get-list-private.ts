import { ErrorMessage } from "@/lib/error-messages";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetListPrivate = (listId?: string) => {
  const query = useQuery({
    enabled: !!listId,
    retry: false,
    queryKey: qk.lists.privateListDetails(listId!),
    queryFn: async () => {
      const response = await client.api.lists[":id"]["private"].$get({
        param: { id: listId },
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(ErrorMessage.lists.NotFoundLists);
        }

        if (response.status === 403) {
          throw new Error(ErrorMessage.user.Unauthorized);
        }

        throw new Error("Error al obtener la lista");
      }
      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
