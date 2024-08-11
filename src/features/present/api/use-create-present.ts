import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { qk } from "@/lib/query-keys";

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
        queryKey: qk.presents.userPresents,
      });
      queryClient.invalidateQueries({
        queryKey: qk.presents.publicPresents,
      });
    },
    onError: () => {
      toast.error("Failed to create present");
    },
  });

  return mutation;
};
