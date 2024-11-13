import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.presents)[":id"]["$delete"],
  200
>;

export const useDeletePresent = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.presents[":id"]["$delete"]({
        param: { id },
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
