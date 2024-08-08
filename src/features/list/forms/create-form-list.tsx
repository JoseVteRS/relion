"use client";

import { SelectMultiple } from "@/components/common/select-multiple";
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
import { insertListsSchema } from "@/db/schema";
import { useGetPresentsWithoutList } from "@/features/present/api/use-get-presents-without-list";
import { useGetUserPresents } from "@/features/present/api/use-get-user-presents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = insertListsSchema
  .pick({
    name: true,
    description: true,
    status: true,
  })
  .extend({
    presentIds: z.array(z.string()).optional(),
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
  const { data: presents, isLoading } = useGetPresentsWithoutList();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <div className="mb-20">
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* TODO: Add multiselect presents */}

          <div className="mt-5">
            <Button type="submit" className="w-full" variant="primary">
              Crear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
