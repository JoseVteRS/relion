import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { Present } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.picks)[":presentId"]["$delete"]
>;

// TODO: Invalidar el query del regalo y no de toda la lista
export const useDeletePick = (presentId?: string, listId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.picks[":presentId"].$delete({
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
        (previousData: any) => {
          console.log({remove: previousData})
          return {
            ...previousData,
            presents: previousData.presents.map((present: Present) =>
              present.id === presentId
                ? { ...present, isPicked: false }
                : present
            ),
          };
        }
      );

      return { previousData };
    },
    onSuccess: (present: any) => {
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
