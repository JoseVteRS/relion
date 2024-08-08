import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";
import { LISTS_QUERY_KEY } from "@/features/list/lists-query-keys";
import { PRESENTS_QUERY_KEY } from "@/features/present/presents-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.lists)[":id"]["$delete"]
>;

export const useDeleteList = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.lists[":id"]["$delete"]({
        param: { id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("List deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LISTS],
      });
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
      });
    },
    onError: () => {
      toast.error("Error deleting list");
    },
  });

  return mutation;
};
