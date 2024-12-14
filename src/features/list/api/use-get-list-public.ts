import { ErrorMessage } from "@/lib/error-messages";
import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetListPublic = (listId?: string) => {
  const query = useQuery({
    queryKey: qk.lists.publicListDetails(listId!),
    retry: false,
    queryFn: async () => {
      try {
        const response = await client.api.lists[":listId"]["shared"].$get({
          param: { listId },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(ErrorMessage.user.Unauthorized);
          }
          if (response.status === 404) {
            throw new Error(ErrorMessage.lists.NotFoundLists);
          }
          throw new Error(`Error al obtener la lista: aasdf`);
        }

        const { data } = await response.json();
        return data;
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
