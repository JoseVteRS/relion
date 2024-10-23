import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.presents)[":presentId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.presents)[":presentId"]["$patch"]
>;

export const useUpdatePresent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.presents[":presentId"]["$patch"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el regalo");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: qk.presents.userPresentDetails(data.id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresentDetails(data.id!),
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresentsInList(data.id!),
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
