"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePresent } from "../api/use-create-present";
import { useCreatePresentModal } from "../hooks/use-create-present-modal";
import { createPresentSchema } from "../schemas";

interface CreatePresentFormProps {
  onCancel?: () => void;
}

export const CreatePresentForm = ({ onCancel }: CreatePresentFormProps) => {
  const router = useRouter();
  const { data: lists, isLoading } = useGetUserLists();
  const { mutate: createPresent, isPending: creatingPresent } =
    useCreatePresent();
  const { close } = useCreatePresentModal();

  const form = useForm({
    resolver: zodResolver(createPresentSchema),
    defaultValues: {
      name: "",
      link: "",
      description: "",
      status: true,
      listId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createPresentSchema>) => {
    createPresent(values, {
      onSuccess: () => {
        form.reset();
        // router.push("/dashboard/presents");
        close();
      },
    });
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Nombre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nombre del regalo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Enlace al producto</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://www.amazon.es" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Descripción</FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder="Descripción del regalo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listId"
            render={({ field }) => (
              <FormItem className="items-center justify-between">
                <FormLabel className="text-sm">Listas</FormLabel>
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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Estado</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              onClick={onCancel}
              disabled={creatingPresent}
              className={cn(!onCancel && "invisible")}
            >
              Cancelar
            </Button>
            <Button disabled={creatingPresent} type="submit" size="lg">
              {creatingPresent ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Añadiendo regalo</span>
                </>
              ) : (
                "Añadir regalo"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
