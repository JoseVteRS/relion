import { ErrorMessage } from "@/lib/error-messages";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export const usePublicList = (listId?: string) => {
  const query = useQuery({
    queryKey: qk.lists.publicListDetails(listId!),
    retry: false,
    queryFn: async () => {
      try {
        const [listResponse, presentsResponse] = await Promise.all([
          client.api.lists.list[":id"].$get({
            param: { id: listId },
          }),
          client.api.presents["list-presents"][":listId"].$get({
            param: {
              listId: listId,
            },
          }),
        ]);

        if (!listResponse.ok) {
          if (listResponse.status === 401) {
            throw new Error(ErrorMessage.user.Unauthorized);
          }
          throw new Error(
            `Error al obtener la lista: ${listResponse.statusText}`
          );
        }

        if (!presentsResponse.ok) {
          if (presentsResponse.status === 401) {
            throw new Error(ErrorMessage.user.Unauthorized);
          }
          throw new Error(
            `Error al obtener los regalos: ${presentsResponse.statusText}`
          );
        }

        const { data: listData } = await listResponse.json();
        const { data: presentsData } = await presentsResponse.json();

        return { listData, presentsData };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        }
        throw new Error("Ocurrió un error inesperado");
      }
    },
  });

  return query;
};
