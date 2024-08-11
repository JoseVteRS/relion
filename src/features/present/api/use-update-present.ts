import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { qk } from "@/lib/query-keys";

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
        queryKey: qk.presents.userPresentDetails(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresentDetails(id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.userPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.userLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicLists,
      });
    },
  });

  return mutation;
};
