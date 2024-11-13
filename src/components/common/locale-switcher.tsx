"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import EEUUFlagIcon from "../icons/flags/eeuu";
import GermanFlagIcon from "../icons/flags/german";
import SpainFlagIcon from "../icons/flags/spain";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    // Obtiene la ruta actual y reemplaza el segmento del idioma
    const newPath = pathname.replace(`/${locale}/`, `/${nextLocale}/`);
    router.replace(newPath, { scroll: false });
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel className="text-xs" >{t("language")}</SelectLabel> */}
          <SelectItem value="es">
            <div className="flex items-center justify-center gap-x-2">
              <SpainFlagIcon className="size-4" />
              <div>Español</div>
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex items-center justify-center gap-x-2">
              <EEUUFlagIcon className="size-4" />
              <div>English (US)</div>
            </div>
          </SelectItem>
          <SelectItem value="de" disabled>
            <div className="flex items-center justify-center gap-x-2">
              <GermanFlagIcon className="size-4" />
              <div>Deutsch (soon)</div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
