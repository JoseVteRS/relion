"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePresent } from "../api/use-create-present";
import { createPresentSchema } from "../schemas";

interface CreatePresentFormProps {
  onCancel?: () => void;
}

export const CreatePresentForm = ({ onCancel }: CreatePresentFormProps) => {
  const router = useRouter();
  const { data: lists, isLoading } = useGetUserLists();
  const { mutate: createPresent, isPending: creatingPresent } =
    useCreatePresent();
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
        router.push("/presents");
      },
    });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Añade un nuevo regalo
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <FormLabel className="text-sm">Estado</FormLabel>

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

            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={creatingPresent}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button disabled={creatingPresent} type="submit" size="lg">
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
