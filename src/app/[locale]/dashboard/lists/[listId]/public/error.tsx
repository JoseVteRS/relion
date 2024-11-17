"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { CrossIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-red-600 p-8 rounded-lg text-center max-w-md w-full relative">
        <div className="absolute -top-[60px] right-1/2 translate-x-1/2 bg-red-600 border-[6px] border-white dark:border-black p-4 rounded-full flex items-center justify-center">
          <XIcon className="size-12 text-white" />
        </div>

        <div className="text-white text-xl font-bold mb-2">
          ¡Ups! Algo salió mal
        </div>
        <h2 className="text-lg  text-white mb-6">{error.message}</h2>
        <Button variant="destructive" size="lg" onClick={() => reset()}>
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}
