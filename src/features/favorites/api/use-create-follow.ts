import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.favorites.follow)[":listId"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.favorites.follow)[":listId"]["$post"]
>["param"];

type UseCreateFollowParams = {
  userId: string;
  listId: string;
};

export const useCreateFollow = ({ userId, listId }: UseCreateFollowParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.favorites.follow[":listId"]["$post"]({
        param: { listId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavorite(listId),
      });
      queryClient.invalidateQueries({
        queryKey: qk.favorite.getFavoritesByUserId(userId),
      });
    },
  });

  return mutation;
};
