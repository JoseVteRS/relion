import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { LISTS_QUERY_KEY } from "../lists-query-keys";
import { toast } from "sonner";
import { PRESENTS_QUERY_KEY } from "@/features/present/presents-query-keys";

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
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LIST_ID, { id }],
      });
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LISTS],
      });
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
      });
    },
  });

  return mutation;
};
