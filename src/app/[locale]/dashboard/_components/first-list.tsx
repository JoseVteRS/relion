"use client";
import { Button } from "@/components/ui/button";
import { presents } from "@/db/schema";
import { useCreateFirstList } from "@/features/first-list/api/use-create-first-list";
import { useCreateFirstPresents } from "@/features/first-list/api/use-create-first-presents";
import confetti from "canvas-confetti";
import { ImportIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LocalStorageData {
  id: string;
  name: string;
  eventDate: string;
}

interface LocalStorageDataPresents {
  id: string;
  name: string;
  description: string;
  link: string;
  listId: string;
}

export const FirstListButton = () => {
  const router = useRouter();

  const locale = useLocale();

  const [listData, setListData] = useState<LocalStorageData | null>(null);
  const [presentsData, setPresentsData] = useState<
    LocalStorageDataPresents[] | null
  >(null);

  const firstList = useCreateFirstList();
  const firstPresents = useCreateFirstPresents();

  useEffect(() => {
    const listaLocal = localStorage.getItem("firstList");
    const presentsLocal = localStorage.getItem("firstPresents");

    if (listaLocal && presentsLocal) {
      try {
        const listaLocalParsed = JSON.parse(listaLocal) as LocalStorageData;
        const presentsLocalParsed = JSON.parse(
          presentsLocal
        ) as LocalStorageDataPresents[];
        setListData(listaLocalParsed);
        setPresentsData(presentsLocalParsed);
      } catch (error) {
        console.error("Error al parsear los datos del localStorage:", error);
      }
    }
  }, []);

  function handleImport() {
    if (!listData || !presentsData) return;
    firstList.mutate(
      {
        eventDate: new Date(listData.eventDate),
        id: listData.id,
        name: listData.name,
      },
      {
        onSuccess: () => {
          firstPresents.mutate(presentsData, {
            onSuccess: () => {
              confetti();
              localStorage.removeItem("firstList");
              localStorage.removeItem("firstPresents");
              router.push(`/${locale}/dashboard/lists`);
            },
          });
        },
      }
    );
  }

  return !!listData || !!presentsData ? (
    <Button variant="default">
      <ImportIcon className="mr-2" /> Importar lista y regalos
    </Button>
  ) : null;
};
