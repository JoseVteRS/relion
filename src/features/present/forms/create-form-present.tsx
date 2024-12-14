"use client";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { PresentStatus } from "@prisma/client";
import { Loader, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePresent } from "../api/use-create-present";
import { useCreatePresentModal } from "../hooks/use-create-present-modal";
import { createPresentSchema } from "../schemas";

interface CreatePresentFormProps {
  onCancel?: () => void;
}

export const CreatePresentForm = ({ onCancel }: CreatePresentFormProps) => {
  const router = useRouter();

  const t = useTranslations("Dashboard.Presents.form");
  const locale = useLocale();

  const { data: lists, isLoading } = useGetUserLists();

  const { mutate: createPresent, isPending: creatingPresent } =
    useCreatePresent();
  const { close } = useCreatePresentModal();

  const { listId } = useParams();

  const form = useForm({
    resolver: zodResolver(createPresentSchema),
    defaultValues: {
      name: "",
      link: "",
      description: "",
      status: PresentStatus.PUBLIC,
      listId: typeof listId === "string" ? listId : "",
    },
  });

  const onSubmit = (values: z.infer<typeof createPresentSchema>) => {
    createPresent(values, {
      onSuccess: () => {
        close();
        router.push(`/${locale}/dashboard/presents`);
      },
    });
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{t("name")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("namePlaceholder")} />
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
                <FormLabel className="text-sm">{t("link")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("linkPlaceholder")} />
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
                <FormLabel className="text-sm">{t("description")}</FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    placeholder={t("descriptionPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="listId"
            render={({ field }) => (
              <FormItem className="items-center justify-between">
                <FormLabel className="text-sm">{t("list")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className="text-white"
                          placeholder={t("listPlaceholder")}
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

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t("status")}</FormLabel>
                </div>
                <FormControl>
                  {/* <Switch
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  /> */}

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PresentStatus.PUBLIC}>
                        Público
                      </SelectItem>
                      <SelectItem value={PresentStatus.PRIVATE}>
                        Privado
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
              disabled={creatingPresent}
              className={cn(!onCancel && "invisible")}
            >
              {t("cancel")}
            </Button>
            <Button disabled={creatingPresent} type="submit" size="lg">
              {creatingPresent ? (
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
