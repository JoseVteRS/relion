import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.favorites.unfollow)[":listId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.favorites.unfollow)[":listId"]["$delete"]
>["param"];

interface UseUnfollowParams {
  listId: string;
  userId: string;
}

export const useUnfollow = ({ listId, userId }: UseUnfollowParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.favorites.unfollow[":listId"].$delete({
        param: {
          listId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow list");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavorite(listId),
      });
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavoritesByUserId(userId),
      })
    },
    onError: (error, variables, context) => {
      toast.error("Error al dejar de seguir una lista");
    },
  });
  return mutation;
};
