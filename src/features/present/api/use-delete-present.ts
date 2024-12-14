import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.presents)[":presentId"]["$delete"],
  200
>;

export const useDeletePresent = (presentId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.presents[":presentId"]["$delete"]({
        param: { presentId },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Present not found");
        }
        throw new Error("Error deleting present");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Present deleted successfully");
      queryClient.invalidateQueries({
        queryKey: qk.presents.userPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.privateListDetails(data.listId!),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
