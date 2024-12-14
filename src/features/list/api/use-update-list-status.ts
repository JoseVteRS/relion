import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { ListStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.lists)[":id"]["status"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.lists)[":id"]["status"]["$patch"]
>["json"];

export const useUpdateListStatus = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, { status: ListStatus }>({
    mutationFn: async ({ status }) => {
      const response = await client.api.lists[":id"].status.$patch({
        param: { id },
        json: { status },
      });

      if (!response.ok) {
        throw new Error("Error updating list status");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Lista actualizada exitosamente");
      queryClient.invalidateQueries({
        queryKey: qk.lists.privateListDetails(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicListDetails(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.userLists,
      });
    },
  });
};
