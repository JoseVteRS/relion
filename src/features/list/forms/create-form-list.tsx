"use client";

import { ConfirmEmail } from "@/components/emails/confirm-email";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Resend } from "resend";
import { z } from "zod";
import { useCreateList } from "../api/use-create-list";
import { useCreateListModal } from "../hooks/use-create-list-modal";
import { createListSchema } from "../schemas";
interface CreateListFormProps {
  onCancel?: () => void;
}

export const CreateListForm = ({ onCancel }: CreateListFormProps) => {
  const router = useRouter();
  const { mutate: createList, isPending: creatingList } = useCreateList();
  const { close } = useCreateListModal();

  const t = useTranslations("Dashboard.Lists.form");

  const form = useForm<z.infer<typeof createListSchema>>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: "",
      eventDate: new Date(),
      status: true,
    },
  });

  const handleSubmit = (values: z.infer<typeof createListSchema>) => {
    createList(values, {
      onSuccess: async () => {
        form.reset();
        // router.push("/dashboard/lists");
        close();
      },
    });
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t("name")}</FormLabel>
                </div>
                <FormControl>
                  <Input {...field} placeholder={t("namePlaceholder")} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel className="text-base">
                  {t("eventDateTitle")}
                </FormLabel>
                <Popover modal={false}>
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
                          <span>{t("eventDatePlaceholder")}</span>
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
                      initialFocus={false}
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {t("estatusTitle")}
                  </FormLabel>
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
              disabled={creatingList}
              className={cn(!onCancel && "invisible")}
            >
              {t("cancel")}
            </Button>
            <Button disabled={creatingList} type="submit" size="lg">
              {creatingList ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>{t("loading")}</span>
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
