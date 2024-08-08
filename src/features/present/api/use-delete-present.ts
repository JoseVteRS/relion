import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { PRESENTS_QUERY_KEY } from "../presents-query-keys";
import { toast } from "sonner";
import { LISTS_QUERY_KEY } from "@/features/list/lists-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.presents)[":id"]["$delete"]
>;

export const useDeletePresent = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.presents[":id"]["$delete"]({
        param: { id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Present deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.PUBLIC_LIST_ID]
      })
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LISTS]
      })
    },
    onError: () => {
      toast.error("Error deleting present");
    },
  });

  return mutation;
};
