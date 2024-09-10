import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";
import { qk } from "@/lib/query-keys";
import { id } from "date-fns/locale";

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
        queryKey: qk.lists.userLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.userPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresentsInList(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.subscription.get,
      });
      queryClient.invalidateQueries({
        queryKey: qk.tier.get,
      });
    },
    onError: () => {
      toast.error("Error deleting list");
    },
  });

  return mutation;
};
