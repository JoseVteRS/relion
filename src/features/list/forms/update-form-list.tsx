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
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { insertListsSchema } from "@/db/schema";
import { useGetPresentsWithoutList } from "@/features/present/api/use-get-presents-without-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormValuesUpdateList, updateListFormSchema } from "./form-schemas";

type CreateListFormProps = {
  defaultValues?: any;
  onSubmit: (values: any) => void;
  disabled?: boolean;
};

export const UpdateListForm = ({
  defaultValues,
  onSubmit,
  disabled,
}: CreateListFormProps) => {
  const { data: presents, isLoading } = useGetPresentsWithoutList();

  const presentOptions =
    presents?.map((present) => ({
      value: present.id,
      label: present.name,
    })) || [];

  const form = useForm<FormValuesUpdateList>({
    resolver: zodResolver(updateListFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValuesUpdateList) => {
    const presents = values.presentIds;
    const presentsIds = presents?.map((present: any) => present.value);
    onSubmit({ ...values, presentIds: presentsIds });
    // form.getValues()
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
                    disabled={disabled}
                    placeholder="Nombre de la lista"
                    {...field}
                    value={field.value ?? ""}
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
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* //TODO: Add multiselect presents */}
          <div className="mt-5">
            <Button type="submit" className="w-full" variant="primary">
              Actualizar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
