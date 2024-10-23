"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { FiCopy } from "react-icons/fi";

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className="p-2 rounded-md focus:border focus:outline-none"
        aria-label="Copiar al portapapeles"
      >
        <FiCopy className="size-5 text-black dark:text-white" />
      </button>
      {showTooltip && (
        <Badge
          variant="secondary"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2"
        >
          ¡Copiado!
        </Badge>
      )}
    </div>
  );
};
