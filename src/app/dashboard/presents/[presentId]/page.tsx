"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPresent } from "@/features/present/api/use-get-user-present";
import { UpdatePresentForm } from "@/features/present/forms/edit-form-present";
import { Present } from "@/features/present/types";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SinglePresentPageProps {
  params: {
    presentId: string;
  };
}

export default function SinglePresentPage({ params }: SinglePresentPageProps) {
  const router = useRouter();
  const {
    data: present,
    isLoading: loadingPresent,
    isError,
  } = useGetUserPresent({ presentId: params.presentId });

  if (loadingPresent) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        Ha ocurrido un error al cargar el regalo
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Button
        className="w-fit"
        size="sm"
        variant="secondary"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Volver
      </Button>
      <Card className="border-none shadow-none max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            Editar <strong>{present?.present.name}</strong>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {present && (
            <UpdatePresentForm initialValues={present.present as Present} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
