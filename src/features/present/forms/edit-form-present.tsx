"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useUpdatePresent } from "../api/use-update-present";
import { updatePresentSchema } from "../schemas";
import { Present } from "../types";

interface EditPresentFormProps {
  onCancel?: () => void;
  initialValues: Present;
}

export const UpdatePresentForm = ({
  initialValues,
  onCancel,
}: EditPresentFormProps) => {
  const router = useRouter();
  const { data: lists, isLoading } = useGetUserLists();
  const { mutate: updatePresent, isPending: updatingPresent } =
    useUpdatePresent();

  const form = useForm({
    resolver: zodResolver(updatePresentSchema),
    defaultValues: {
      name: initialValues.name || "",
      status: initialValues.status || false,
      listId: initialValues.listId || undefined,
      description: initialValues.description || undefined,
      link: initialValues.link || undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof updatePresentSchema>) => {
    updatePresent({ json: values, param: { presentId: initialValues.id } });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">Nombre</FormLabel>
              </div>
              <FormControl>
                <Input {...field} placeholder="Nombre de la lista" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enlace al producto</FormLabel>
              </div>
              <FormControl>
                <Input {...field} placeholder="https://www.amazon.es/" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">Descripción</FormLabel>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Descripción del regalo"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Estado</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listId"
          render={({ field }) => (
            <FormItem className="items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Listas</FormLabel>
              </div>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-white"
                        placeholder="Selecciona una lista"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      lists?.map((list) => (
                        <SelectItem key={list.id} value={list.id}>
                          {list.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="mt-5 flex lg:justify-end">
          <Button type="submit" className="w-full lg:w-fit">
            {updatingPresent ? (
              <>
                <Loader2 className="animate-spin" />
                Actualizando
              </>
            ) : (
              "Actualizar"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
