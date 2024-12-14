"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Present, PresentStatus } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useUpdatePresent } from "../api/use-update-present";
import { updatePresentSchema } from "../schemas";

interface EditPresentFormProps {
  onCancel?: () => void;
  initialValues: Present;
}

export const UpdatePresentForm = ({
  initialValues,
  onCancel,
}: EditPresentFormProps) => {
  const router = useRouter();

  const t = useTranslations("Dashboard.Presents.editScreen");
  const locale = useLocale();

  const { data: lists, isLoading } = useGetUserLists();
  const { mutate: updatePresent, isPending: updatingPresent } =
    useUpdatePresent();

  const form = useForm({
    resolver: zodResolver(updatePresentSchema),
    defaultValues: {
      name: initialValues.name || "",
      status: initialValues.status || PresentStatus.PUBLIC,
      listId: initialValues.listId || undefined,
      description: initialValues.description || undefined,
      link: initialValues.link || undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof updatePresentSchema>) => {
    updatePresent(
      { json: values, param: { presentId: initialValues.id } },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  return (
    <div className="p-3">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
              disabled={updatingPresent}
              className={cn(!onCancel && "invisible")}
            >
              {t("cancel")}
            </Button>
            <Button disabled={updatingPresent} type="submit" size="lg">
              {updatingPresent ? (
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
