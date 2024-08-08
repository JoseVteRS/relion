"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { insertPresentSchema } from "@/db/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = insertPresentSchema.pick({
  name: true,
  link: true,
  description: true,
  status: true,
});

type FormValues = z.input<typeof formSchema>;

type CreateListFormProps = {
  defaultValues?: any;
  onSubmit: (values: any) => void;
  disabled?: boolean;
};

export const CreateListForm = ({
  defaultValues,
  onSubmit,
  disabled,
}: CreateListFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
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
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Nombre de la lista"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enlace al producto</FormLabel>
              </div>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="https://www.amazon.es/"
                  autoComplete="off"
                  {...field}
                />
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
                  autoComplete="off"
                  rows={5}
                  disabled={form.formState.isSubmitting}
                  placeholder="Descripción del regalo"
                  {...field}
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
        <div className="mt-5">
          <Button type="submit" className="w-full" variant="primary">
            Crear
          </Button>
        </div>
      </form>
    </Form>
  );
};
