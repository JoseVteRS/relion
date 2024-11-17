"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Notifications = () => {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center absolute -top-1 -right-1">
            3
          </span>
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <h3 className="text-lg font-semibold mb-2">Notificaciones</h3>
          <div className="text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="my-1 bg-card dark:bg-black p-2 rounded-sm">
                <p className="font-semibold text-xs text-primary">
                  Gemma ha creado una lista
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Reyes Pau</strong>
                </div>
                <small>14/11/2024</small>
              </div>
              <div className="my-1 bg-card dark:bg-black p-2 rounded-sm">
                <p className="font-semibold text-xs text-primary">
                  Gemma ha añadido un regalo a una lista
                </p>
                <div className="text-xs text-muted-foreground">
                  Regalo: <strong>Reloj de pulsera</strong>
                  <br />
                  Lista: <strong>Reyes Pau</strong>
                </div>
                <small>14/11/2024</small>
              </div>
              <div className="my-1 bg-card dark:bg-black p-2 rounded-sm">
                <p className="font-semibold text-xs text-primary">
                  Alba ha creado una lista
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Cumpleaños</strong>
                </div>
                <small>14/11/2024</small>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
