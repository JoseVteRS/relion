import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";
import { qk } from "@/lib/query-keys";

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
        queryKey: qk.presents.userPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.userLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.userListDetails(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicListDetails(id!),
      });
    },
    onError: () => {
      toast.error("Error deleting present");
    },
  });

  return mutation;
};
