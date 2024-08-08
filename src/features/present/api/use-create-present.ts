import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { PRESENTS_QUERY_KEY } from "../presents-query-keys";

type ResponseType = InferResponseType<typeof client.api.presents.$post>;
type RequestType = InferRequestType<typeof client.api.presents.$post>["json"];

export const useCreatePresent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.presents.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Present created successfully");
      queryClient.invalidateQueries({
        queryKey: [PRESENTS_QUERY_KEY.USER_PRESENTS],
      });
    },
    onError: () => {
      toast.error("Failed to create present");
    },
  });

  return mutation;
};
