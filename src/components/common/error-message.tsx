import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-red-500 mt-2">
      <AlertCircle size={16} />
      <p className="text-sm">{message}</p>
    </div>
  );
};
