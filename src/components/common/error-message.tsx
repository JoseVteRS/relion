import { AlertCircle } from "lucide-react";
import { ErrorMessage } from "@/lib/error-messages";
import { redirect } from "next/navigation";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({
  message,
}) => {
  return (
    <div className="flex items-center gap-2 text-red-500 mt-2">
      <AlertCircle className="size-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
};
