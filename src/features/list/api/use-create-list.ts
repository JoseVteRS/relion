import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { ErrorList } from "../errors-enum";
import { qk } from "@/lib/query-keys";

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
        queryKey: qk.lists.userLists,
      });
      queryClient.invalidateQueries({
        queryKey: qk.lists.publicLists,
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
