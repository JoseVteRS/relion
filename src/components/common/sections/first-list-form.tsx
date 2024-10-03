"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CardList } from "@/features/list/components/card-list";
import { CardFirstList } from "./card-first-list";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre de la lista debe tener al menos 3 caracteres.",
  }),
  eventDate: z.date({
    required_error: "Por favor, selecciona una fecha para el evento.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function FirstListForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      eventDate: new Date(),
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const listData = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        eventDate: values.eventDate.toISOString(),
      };
      localStorage.setItem("firstList", JSON.stringify(listData));
      toast.success("¡Lista creada con éxito!");
      form.reset();
    } catch (error) {
      toast.error(
        "Hubo un problema al guardar la lista. Por favor, intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const localData = localStorage.getItem("firstList");
  const localList = localData ? JSON.parse(localData) : null;

  return !localList ? (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Crea tu&nbsp;
            <span className="text-highlight">primera lista de deseos</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Comienza a organizar tus regalos para tu próximo evento especial.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-row gap-5 items-center justify-center">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg">
                        Nombre de la lista
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mi lista de regalos"
                          {...field}
                          className="text-lg py-6"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel className="text-lg">
                        Fecha del evento
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal text-lg py-6",
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
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-lg px-8 py-3"
              >
                {isSubmitting ? "Creando..." : "Crear mi lista"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  ) : (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            ¡Ya has creado tu primera lista de deseos!
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Comienza a organizar tus regalos para tu próximo evento especial.
          </p>

          <CardFirstList list={localList} />
        </div>
      </div>
    </section>
  );
}
