import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useCreatePresentModal } from "../hooks/use-create-present-modal";

export const PresentNotFount = () => {
  const { open } = useCreatePresentModal();

  const t = useTranslations("Dashboard.Presents.noPresents");

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/elf-01.webp"
          alt="Elfo navideño"
          className="w-1/2 aspect-1280/965 mb-5"
        />

        <h2 className="text-base md:text-2xl font-semibold">
          {t("title")}
        </h2>
      </div>
      <div className="mt-2 md:flex md:flex-col flex-col items-center justify-center">
        <h3 className="text-sm md:text-base text-muted-foreground">
          {t("description")}
        </h3>

        <Button
          onClick={open}
          className="mt-6 w-full md:w-fit"
          aria-label="Añadir regalo"
        >
          {t("button")}
        </Button>
      </div>
    </div>
  );
};
