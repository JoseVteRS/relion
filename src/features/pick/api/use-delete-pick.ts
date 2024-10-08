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

      if (!response.ok) {
        const error = await response.json();
        if ("error" in error) {
          throw new Error(error.error);
        } else {
          throw new Error("Error");
        }
      }

      return await response.json();
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
        (oldData: any) => ({
          ...oldData,
          listData: {
            ...oldData.listData,
            presents: oldData.listData.presents.map((present: any) =>
              present.id === presentId
                ? { ...present, isPicked: false }
                : present
            ),
          },
        })
      );

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicListDetails(listId!),
      });
    },
    onError: (error, variables, context: any) => {
      // Revertir a los datos anteriores en caso de error
      if (context?.previousData) {
        queryClient.setQueryData(
          qk.lists.publicListDetails(listId!),
          context.previousData
        );
      }
      toast.error(`${error.message}`);
    },
  });

  return mutation;
};
