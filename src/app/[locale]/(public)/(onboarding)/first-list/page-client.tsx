"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { es } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  listName: string;
}

function saveListToLocalStorage(listName: string) {
  localStorage.setItem("giftList", listName);
}
export default function OnboardingFirstListPageClient() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const onSubmit = (data: FormData) => {
    const listData = {
      id: crypto.randomUUID(),
      name: data.listName,
      date: selectedDate || new Date(),
    };
    saveListToLocalStorage(JSON.stringify(listData));
    setIsSaved(true);
    if (isSaved) {
      toast.success("Lista guardada correctamente");
    }
  };
  return (
    <section className=" px-4 md:px-0 max-w-screen-[1920px] mx-auto h-screen">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <header className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-pretty tracking-tight">
              Crea tu primera lista
            </h1>
            <p className="text-lg mb-4 text-muted-foreground text-pretty tracking-tight">
              Sin registros y completamente gratis. Es hora de crear tu primera
              lista
            </p>
          </header>
          <div className="w-full flex max-w-xl justify-center items-start">
            <div className="p-4 w-full border-none shadow-none bg-transparent">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="listName">Nombre de la lista</Label>
                  <Input
                    id="listName"
                    type="text"
                    {...register("listName", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="listDate">Seleccionar fecha</Label>
                  <Calendar
                    className="w-full"
                    mode="single"
                    selected={selectedDate || new Date()}
                    onSelect={setSelectedDate}
                    disabled={(date: Date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    // initialFocus={false}
                    locale={es}
                  />
                </div>
                <Button type="submit" className="w-full md:w-fit">
                  Guardar lista
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
