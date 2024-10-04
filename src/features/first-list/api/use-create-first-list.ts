import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { qk } from "@/lib/query-keys";

type ResponseType = InferResponseType<typeof client.api.firstList.lists.$post>;
type RequestType = InferRequestType<typeof client.api.firstList.lists.$post>["json"];

export const useCreateFirstList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.firstList.lists.$post({ json });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.lists.userLists });
      toast.success("List created successfully");
    },
    onError: (error) => {
      toast.error("Error al importar");
    },
  });

  return mutation;
};
