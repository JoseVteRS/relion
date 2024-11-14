"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { Button } from "./ui/button";

export const CtaButton = () => {
  return (
    <Button asChild onClick={() => posthog.capture("$cta_click")}>
      <Link href="#">Click me</Link>
    </Button>
  );
};
