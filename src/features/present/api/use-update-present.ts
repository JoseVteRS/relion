import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { PRESENTS_QUERY_KEY } from "../presents-query-keys";
import { LISTS_QUERY_KEY } from "@/features/list/lists-query-keys";

type ResponseType = InferResponseType<
  (typeof client.api.presents)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.presents)[":id"]["$patch"]
>["json"];

export const useUpdatePresent = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.presents[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENT_ID, { id }],
      });
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LISTS],
      });
    },
  });

  return mutation;
};
