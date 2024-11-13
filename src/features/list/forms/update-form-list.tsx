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
import { Switch } from "@/components/ui/switch";
import { useGetPresentsWithoutList } from "@/features/present/api/use-get-presents-without-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
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
  const t = useTranslations("Dashboard.Lists.form");

  const form = useForm<FormValuesUpdateList>({
    resolver: zodResolver(updateListFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValuesUpdateList) => {
    const presents = values.presentIds;
    const presentsIds = presents?.map((present: any) => present.value);
    onSubmit({ ...values, presentIds: presentsIds });
  };

  return (
    <div className="mb-20">
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
                  <Input
                    disabled={disabled}
                    placeholder={t("namePlaceholder")}
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
                  <FormLabel className="text-base">{t("estatusTitle")}</FormLabel>
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
            <Button type="submit" className="w-full">
              {t("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
