"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface BreadcrumbProps {
  getTextGenerator?: (
    param: string,
    query: URLSearchParams
  ) => Promise<string> | null;
  getDefaultTextGenerator?: (path: string) => string;
}

const _defaultGetTextGenerator = (
  _param: string,
  _query: URLSearchParams
): null => null;
const _defaultGetDefaultTextGenerator = (path: string): string => path;

const generatePathParts = (pathStr: string): string[] => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery.split("/").filter((v) => v.length > 0);
};

export function NextBreadcrumbs({
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const breadcrumbs = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(pathname);

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      return {
        href,
        textGenerator: getTextGenerator(subpath, searchParams),
        text: getDefaultTextGenerator(subpath),
      };
    });

    return [{ href: "/", text: "Home" }, ...crumblist];
  }, [pathname, searchParams, getTextGenerator, getDefaultTextGenerator]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => (
          <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface CrumbProps {
  text: string;
  textGenerator?: Promise<string> | null;
  href: string;
  last?: boolean;
}

function Crumb({
  text: defaultText,
  textGenerator,
  href,
  last = false,
}: CrumbProps) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    const generateText = async () => {
      if (textGenerator) {
        const finalText = await textGenerator;
        setText(finalText || defaultText);
      }
    };

    generateText();
  }, [textGenerator, defaultText]);

  if (last) {
    return <BreadcrumbPage>{text}</BreadcrumbPage>;
  }

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={href}>
          {text}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </>
  );
}
