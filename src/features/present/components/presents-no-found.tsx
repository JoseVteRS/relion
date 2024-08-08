import { Button } from "@/components/ui/button";
import React from "react";
import { useNewPresentSheetState } from "../hooks/use-new-present";

export const PresentNotFount = () => {
  const { onOpen } = useNewPresentSheetState();
  return (
    <div>
      <header className="">
        <h2 className="text-2xl font-semibold">
          Todavía no has creado ningún
          <span className="text-primary"> regalo</span>
        </h2>
      </header>
      <div className="mt-2 text-lg text-neutral-300">
        <h3>Empieza a crear un regalo ahora mismo</h3>

        <Button onClick={onOpen} variant="primary" className="mt-2">
          Crear regalo
        </Button>
      </div>
    </div>
  );
};
