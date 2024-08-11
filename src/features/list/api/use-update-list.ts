import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { qk } from "@/lib/query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.lists)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.lists)[":id"]["$patch"]
>["json"];

export const useUpdateList = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lists[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Lista actualizada exitosamente");
      // queryClient.invalidateQueries({
      //   queryKey: qk.lists.userListDetails(id!),
      // });
      queryClient.invalidateQueries({
        queryKey: qk.lists.userLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.userPresents,
      });
    },
  });

  return mutation;
};
