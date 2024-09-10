"use client";

import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { insertListsSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = insertListsSchema.pick({
  name: true,
  description: true,
  eventDate: true,
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
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      eventDate: values.eventDate.toISOString(),
    });
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

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Fecha del evento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <FormControl className="w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Escoge la fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Indica la fecha en la que se deberá celebrar el evento
                </FormDescription>
                <FormMessage />
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
    </div>
  );
};
