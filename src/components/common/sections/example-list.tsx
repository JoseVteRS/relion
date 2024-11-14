"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, EyeIcon, GiftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function ExampleList() {
  const locale = useLocale();
  const t = useTranslations("Dashboard.FavoriteLists");

  return (
    <section className="py-16 bg-neutral-950 relative overflow-hidden">

    </section>
  );
}
