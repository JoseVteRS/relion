import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.favorites)[":listId"]["unfollow"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.favorites)[":listId"]["unfollow"]["$delete"]
>["param"];

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ listId }) => {
      const response = await client.api.favorites[":listId"]["unfollow"][
        "$delete"
      ]({
        param: { listId },
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow list");
      }

      return response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavorite(data.id),
      });
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavoritesByUserId(data.userId),
      });
    },
    onError: (error, variables, context) => {
      toast.error("Error al dejar de seguir una lista");
    },
  });
  return mutation;
};
