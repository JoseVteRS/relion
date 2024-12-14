import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.favorites)[":listId"]["follow"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.favorites)[":listId"]["follow"]["$post"]
>["param"];

type UseCreateFavoriteParams = {
  userId: string;
  listId: string;
};

export const useCreateFavorite = ({
  userId,
  listId,
}: UseCreateFavoriteParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.favorites[":listId"]["follow"]["$post"](
        {
          param: { listId },
        }
      );

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
