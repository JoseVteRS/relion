import { Present } from "@/db/schema";
import { LISTS_QUERY_KEY } from "@/features/list/lists-query-keys";
import { client } from "@/lib/hono";
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
      return await response.json();
    },
    onSuccess: () => {
      // toast.success("Relago libre!");
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.PUBLIC_LIST_ID, { id: listId }],
      });
    },
    onError: () => {
      toast.error("No se ha podido dejar el regalo libre");
    },
  });

  return mutation;
};
