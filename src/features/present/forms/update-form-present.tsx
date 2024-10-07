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
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { Loader, Loader2 } from "lucide-react";
import {
  UpdatePresentFormValues,
  updatePresetFormSchema,
} from "./form-schemas";

type UpdatePresentFormProps = {
  defaultValues?: any;
  onSubmit: (values: any) => void;
  disabled?: boolean;
};

export const UpdatePresentForm = ({
  defaultValues,
  onSubmit,
  disabled,
}: UpdatePresentFormProps) => {
  const { data: lists, isLoading } = useGetUserLists();

  const form = useForm({
    resolver: zodResolver(updatePresetFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: UpdatePresentFormValues) => {
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
                  placeholder="Nombre de la lista"
                  autoComplete="off"
                  disabled={disabled}
                  {...field}
                />
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
                <Input
                  placeholder="https://www.amazon.es/"
                  autoComplete="off"
                  disabled={disabled}
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
                  disabled={disabled}
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

        <div className="mt-5">
          <Button type="submit" className="w-full">
            {disabled ? <Loader2 className="animate-spin" /> : "Actualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
