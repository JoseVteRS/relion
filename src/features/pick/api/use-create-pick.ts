import { Present } from "@/db/schema";
import { LISTS_QUERY_KEY } from "@/features/list/lists-query-keys";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.picks)[":presentId"]["$post"]
>;


// TODO: Invalidar el query del regalo y no de toda la lista

export const useCreatePick = (presentId?: string, listId?: string) => {
  const queryClient = useQueryClient();


  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.picks[":presentId"].$post({
        param: { presentId },
      });
      return await response.json();
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["presents-list"],
      });
      const previousData = queryClient.getQueryData([
        LISTS_QUERY_KEY.PUBLIC_LIST_ID,
        { id: listId },
      ]);
      
      // Actualización optimista de la UI
      queryClient.setQueryData(
        ["presents-list"],
        (oldData: any) => {
          if (!oldData) return oldData;
          
          return {
            ...oldData,
            presents: oldData.presents.map((present: any) =>
              present.id === presentId ? { ...present, isPicked: true } : present
            ),
          };
        }
      );
      
      return { previousData };
    },
    onSuccess: (present: any) => {
      //   toast.success("Present created successfully"); //TODO: considerar si dejar o no
      queryClient.invalidateQueries({
        queryKey: ["presents-list"],
      });
    },
    onError: () => {
      toast.error("Failed to pick present");
    },
  });

  return mutation;
};
