import { client } from "@/lib/hono";
import { qk } from "@/lib/query-keys";
import { PickStatus } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.picks)[":presentId"]["status"]["$patch"]
>;

type ResponseType = InferResponseType<
  (typeof client.api.picks)[":presentId"]["status"]["$patch"]
>;

export const useUpdatePick = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.picks[":presentId"]["status"]["$patch"](
        {
          json,
          param,
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el regalo");
      }

      return await response.json();
    },
    onSuccess: () => {},
    onError: () => {
      toast.error("Error al actualizar el regalo");
    },
  });

  return mutation;
};
