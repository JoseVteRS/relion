"use client";

import { useState, useEffect } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CalendarIcon,
  CheckCircleIcon,
  GiftIcon,
  Link2Icon,
  PlusIcon,
  Share2Icon,
  ShareIcon,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CardFirstList } from "./card-first-list";
import { CardFirstPresent } from "./card-first-present";
import confetti from "canvas-confetti";

const listFormSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre de la lista debe tener al menos 3 caracteres.",
  }),
  eventDate: z.date({
    required_error: "Por favor, selecciona una fecha para el evento.",
  }),
});

const presentFormSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre del regalo debe tener al menos 3 caracteres.",
  }),
  description: z.string().optional(),
  link: z.string().url().optional().or(z.literal("")),
});

type ListFormValues = z.infer<typeof listFormSchema>;
type PresentFormValues = z.infer<typeof presentFormSchema>;

interface LocalList extends ListFormValues {
  id: string;
  createdAt: Date;
  eventDate: Date;
}

interface LocalPresent extends PresentFormValues {
  id: string;
  createdAt: Date;
  listId: string;
}

const steps = [
  { number: 1, label: "Crear lista" },
  { number: 2, label: "Añadir regalos" },
  { number: 3, label: "Compartir" },
];

export function FirstListForm() {
  const [step, setStep] = useState(1);
  const [localList, setLocalList] = useState<LocalList | null>(null);
  const [localPresents, setLocalPresents] = useState<LocalPresent[]>([]);
  const router = useRouter();

  const listForm = useForm<ListFormValues>({
    resolver: zodResolver(listFormSchema),
    defaultValues: {
      name: "",
      eventDate: new Date(),
    },
  });

  const presentForm = useForm<PresentFormValues>({
    resolver: zodResolver(presentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
    },
  });

  useEffect(() => {
    const storedList = localStorage.getItem("firstList");
    const storedPresents = localStorage.getItem("firstPresents");
    if (storedList) {
      setLocalList(JSON.parse(storedList));
      setStep(2);
    }
    if (storedPresents) {
      setLocalPresents(JSON.parse(storedPresents));
      if (JSON.parse(storedPresents).length >= 2) {
        setStep(3);
      }
    }
  }, []);

  function onSubmitList(values: ListFormValues) {
    try {
      const listData: LocalList = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        eventDate: values.eventDate,
      };
      localStorage.setItem("firstList", JSON.stringify(listData));
      setLocalList(listData);
      toast.success("¡Lista creada con éxito!");
      setStep(2);
      confetti();
    } catch (error) {
      toast.error(
        "Hubo un problema al guardar la lista. Por favor, intenta de nuevo."
      );
    }
  }

  function onSubmitPresent(values: PresentFormValues) {
    if (!localList) return;
    try {
      const presentData: LocalPresent = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        listId: localList.id,
      };
      const updatedPresents = [...localPresents, presentData];
      localStorage.setItem("firstPresents", JSON.stringify(updatedPresents));
      setLocalPresents(updatedPresents);
      toast.success("¡Regalo añadido con éxito!");
      presentForm.reset();

      if (updatedPresents.length >= 2) {
        setStep(3);
        confetti();
      }
    } catch (error) {
      toast.error(
        "Hubo un problema al guardar el regalo. Por favor, intenta de nuevo."
      );
    }
  }

  function redirectToRegister() {
    router.push("/sign-up");
  }

  return (
    <div className="bg-gradient-to-b from-background to-primary/10 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProgressSteps steps={steps} currentStep={step} />

        {step === 1 && (
          <section className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <GiftIcon className="w-16 h-16 mx-auto mb-6 text-primary animate-bounce" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                Crea tu{" "}
                <span className="text-primary">primera lista de deseos</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Comienza a organizar tus regalos para tu próximo evento
                especial.
              </p>

              <Form {...listForm}>
                <form
                  onSubmit={listForm.handleSubmit(onSubmitList)}
                  className="space-y-8 bg-card p-8 rounded-lg shadow-lg"
                >
                  <FormField
                    control={listForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">
                          Nombre de la lista
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Mi lista de cumpleaños"
                            {...field}
                            className="text-lg py-6"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={listForm.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
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
                                  <span>Escoge una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto size-5 opacity-50" />
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
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg py-6">
                    Crear lista
                  </Button>
                </form>
              </Form>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <PlusIcon className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                Añade regalos a tu lista
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Agrega al menos dos regalos a tu lista de deseos.
              </p>

              {localList && <CardFirstList list={localList as any} />}
              {localPresents.map((present) => (
                <CardFirstPresent key={present.id} present={present as any} />
              ))}
              <div className="bg-card p-8 rounded-lg shadow-lg mt-8">
                <Form {...presentForm}>
                  <form
                    onSubmit={presentForm.handleSubmit(onSubmitPresent)}
                    className="space-y-8"
                  >
                    <FormField
                      control={presentForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Nombre del regalo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nuevo regalo"
                              {...field}
                              className="text-lg py-6"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={presentForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Descripción (opcional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe el regalo..."
                              {...field}
                              className="text-lg py-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={presentForm.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">
                            Enlace (opcional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://ejemplo.com"
                              {...field}
                              className="text-lg py-6"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full text-lg py-6">
                      Añadir regalo
                    </Button>
                  </form>
                </Form>
              </div>

              {localPresents.length >= 2 && (
                <Button
                  onClick={() => setStep(3)}
                  className="mt-8 text-lg py-6"
                >
                  Continuar
                </Button>
              )}
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <ShareIcon className="w-16 h-16 mx-auto mb-6 text-primary animate-bounce" />
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
                ¡Tu lista está lista para compartir!
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Regístrate para poder compartir tu lista y recibir regalos.
              </p>

              {localList && <CardFirstList list={localList as any} />}

              {localPresents.map((present) => (
                <CardFirstPresent key={present.id} present={present as any} />
              ))}

              <Button
                onClick={redirectToRegister}
                className="mt-8 text-lg py-6 px-8"
              >
                <Share2Icon className="mr-2" /> Compartir lista
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

interface Step {
  number: number;
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <ol className="flex items-center justify-center w-full">
      {steps.map((step, index) => (
        <li
          key={step.number}
          className={cn(
            "flex items-center",
            index < steps.length - 1 &&
              "w-full sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-muted  after:hidden sm:after:inline-block after:mx-2 md:after:mx-4 xl:after:mx-6"
          )}
        >
          <div className="flex flex-col items-center justify-center">
            {currentStep > step.number ? (
              <CheckCircleIcon
                className={cn("size-4 sm:size-5", {
                  "text-primary stroke-[3px]": currentStep >= step.number,
                })}
              />
            ) : (
              <span className="text-primary">{step.number}.</span>
            )}

            <div
              className={cn(
                "flex items-center justify-center w-[100px]",
                "after:content-['/'] sm:after:hidden after:mx-2 after:text-muted",
                "text-xs sm:text-xs lg:text-sm",
                currentStep >= step.number
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span className="text-accent-foreground">{step.label}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
