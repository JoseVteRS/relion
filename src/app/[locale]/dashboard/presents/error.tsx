"use client";
import ErrorPage from "@/components/common/error-page";
import { useLocale } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  useEffect(() => {
    console.error(error);
  }, [error]);

  console.log({ error });

  return (
    <div>
      <ErrorPage
        title={error.message}
        redirectText="Volver a intentar"
        redirectUrl={`/${locale}/dashboard/presents`}
      />
    </div>
  );
}
