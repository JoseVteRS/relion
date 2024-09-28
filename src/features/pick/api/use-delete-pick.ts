import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.picks)[":presentId"]["$patch"]
>;

// TODO: Invalidar el query del regalo y no de toda la lista
export const useDeletePick = (presentId?: string, listId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.picks[":presentId"].$patch({
        param: { presentId },
      });
      const data = await response.json();
      return data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: qk.lists.publicListDetails(listId!),
      });
      const previousData = queryClient.getQueryData(
        qk.lists.publicListDetails(listId!)
      );

      // Actualización optimista de la UI
      queryClient.setQueryData(
        qk.lists.publicListDetails(listId!),
        (oldData: any) => {
          oldData.listData.presents.map((present: any) => {
            if (present.id === presentId) {
              present.isPicked = false;
            }
            return present;
          });
        }
      );

      return { previousData };
    },
    onSuccess: (present: any) => {
      //   toast.success("Present created successfully"); //TODO: considerar si dejar o no
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicListDetails(listId!),
      });
    },
    onError: () => {
      toast.error("No puedes desmarcar un regalo que no hayas escogido");
    },
  });

  return mutation;
};
