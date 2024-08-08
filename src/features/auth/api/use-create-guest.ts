import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGuest = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await client.api.guests.$post();

      if (!response.ok) {
        throw new Error("No se pudo crear el usuario invitado");
      }

      return response.json();
    },
    onSuccess: (data) => {
      document.cookie = `project-l=${data.newGuest.numberId}; path=/`;
      toast.success("Usuario invitado creado");
    },
  });

  return mutation;
};
