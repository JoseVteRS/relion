import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { LISTS_QUERY_KEY } from "../lists-query-keys";
import { ErrorList } from "../errors-enum";

type ResponseType = InferResponseType<typeof client.api.lists.$post>;
type RequestType = InferRequestType<typeof client.api.lists.$post>["json"];

export const useCreateList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lists.$post({ json });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("List created successfully");
      queryClient.invalidateQueries({
        queryKey: [LISTS_QUERY_KEY.USER_LISTS],
      });
    },
    onError: (error) => {
      if (error.message === ErrorList.MaxListsExceeded) {
        toast.error(ErrorList.MaxListsExceeded);
      } else {
        toast.error("Error al crear la lista");
      }
    },
  });

  return mutation;
};
