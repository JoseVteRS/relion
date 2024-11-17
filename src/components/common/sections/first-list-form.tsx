"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  CheckCircleIcon,
  GiftIcon,
  Link2Icon,
  PlusIcon,
  Share2Icon,
  ShareIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { CardFirstList } from "./card-first-list";
import { CardFirstPresent } from "./card-first-present";

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
  const t = useTranslations("Home.CreateFreeList");

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
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <ProgressSteps steps={steps} currentStep={step} />

      {step === 1 && (
        <div className="mt-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>

          <Form {...listForm}>
            <form
              onSubmit={listForm.handleSubmit(onSubmitList)}
              className="space-y-4 bg-card p-6 rounded-lg border shadow-sm"
            >
              <FormField
                control={listForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labelFirstListName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("placeholderFirstListName")}
                        {...field}
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
                    <FormLabel>{t("labelFirstListEventDate")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
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
                              <span>{t("placeholderFirstListEventDate")}</span>
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
                          initialFocus={false}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="w-fit" variant="secondary">
                  {t("buttonCreateFreeList")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Añade regalos a tu lista
            </h2>
            <p className="text-sm text-muted-foreground">
              Agrega al menos dos regalos a tu lista de deseos
            </p>
          </div>

          {localList && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <CardFirstList list={localList as any} />
            </div>
          )}

          {localPresents.map((present) => (
            <div key={present.id} className="bg-muted/50 rounded-lg p-4">
              <CardFirstPresent present={present as any} />
            </div>
          ))}

          <Form {...presentForm}>
            <form
              onSubmit={presentForm.handleSubmit(onSubmitPresent)}
              className="space-y-4 bg-card p-6 rounded-lg border shadow-sm"
            >
              <FormField
                control={presentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del regalo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nuevo regalo" {...field} />
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
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe el regalo..."
                        {...field}
                        rows={3}
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
                    <FormLabel>Enlace (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Añadir regalo
              </Button>
            </form>
          </Form>

          {localPresents.length >= 2 && (
            <Button
              onClick={() => setStep(3)}
              className="w-full"
              variant="secondary"
            >
              Continuar
            </Button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              ¡Lista completada!
            </h2>
            <p className="text-sm text-muted-foreground">
              Regístrate para poder compartir tu lista y recibir regalos
            </p>
          </div>

          <div className="space-y-4">
            {localList && (
              <div className="bg-muted/50 rounded-lg p-4">
                <CardFirstList list={localList as any} />
              </div>
            )}

            {localPresents.map((present) => (
              <div key={present.id} className="bg-muted/50 rounded-lg p-4">
                <CardFirstPresent present={present as any} />
              </div>
            ))}
          </div>

          <Button onClick={redirectToRegister} className="w-full">
            <Share2Icon className="mr-2 h-4 w-4" />
            Registrarme y compartir
          </Button>
        </div>
      )}
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
