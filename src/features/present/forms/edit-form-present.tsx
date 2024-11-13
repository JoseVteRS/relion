"use client";
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

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useUpdatePresent } from "../api/use-update-present";
import { updatePresentSchema } from "../schemas";
import { Present } from "../types";

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
      status: initialValues.status || false,
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
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex w-full flex-col lg:flex-row gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
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
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t("link")}</FormLabel>
                </div>
                <FormControl>
                  <Input {...field} placeholder={t("linkPlaceholder")} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel className="text-base">{t("description")}</FormLabel>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder={t("descriptionPlaceholder")}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row itemscenter justify-start pt-0 py-5">
              <FormLabel className="text-base">{t("status")}</FormLabel>

              <FormControl>
                <Switch
                  style={{ marginTop: 0 }}
                  className="ml-2"
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
                <FormLabel className="text-base">{t("list")}</FormLabel>
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

        <div className="mt-5 flex md:justify-end lg:justify-end">
          <Button type="submit" className="w-full md:w-fit lg:w-fit">
            {updatingPresent ? (
              <>
                <Loader2 className="animate-spin" />
                {t("loading")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
