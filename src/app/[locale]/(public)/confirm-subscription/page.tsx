"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ConfirmSubscription() {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div
            className={cn(
              "relative flex flex-col p-8 bg-card text-card-foreground rounded-lg shadow-md border border-border transition-all hover:shadow-lg",
              "ring-2 ring-primary"
            )}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
              }}
            />
            <svg
              className="w-16 h-16 text-primary mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold text-center mb-4">
              ¡Suscripción Confirmada!
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Gracias por suscribirte a nuestra newsletter. Recibirás nuestras últimas actualizaciones y ofertas exclusivas.
            </p>
            <Button
              size="lg"
              className="mt-4 text-sm font-semibold text-neutral-800"
              onClick={() => router.push("/")}
            >
              Volver a la página principal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}