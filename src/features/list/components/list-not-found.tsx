import { Button } from "@/components/ui/button";
import React from "react";

import { useNewListStateSheet } from "../hooks/use-new-list";
export const ListNotFound = () => {
  const { onOpen } = useNewListStateSheet();
  return (
    <div>
      <header className="">
        <h2 className="text-2xl font-semibold">
          Todavía no has creado ninguna 
          <span className="text-primary"> lista</span>
        </h2>
      </header>
      <div className="mt-2 text-lg text-neutral-300">
        <h3>Empieza a crear una lista ahora mismo</h3>

        <Button onClick={onOpen} variant="primary" className="mt-2">
          Crear lista
        </Button>
      </div>
    </div>
  );
};
