import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import config from "../../../config/config";
import { LocaleSwitcher } from "./locale-switcher";
import LogoLight from "./logo/logo-light";

export const Navbar = async () => {
  const session = await auth();
  const locale = await getLocale();
  const { raw } = await getTranslations("Navbar");
  return (
    <nav className=" bg-neutral-950 text-neutral-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="w-full text-white flex items-center justify-start gap-5">
          <h1 className="font-bold text-lg">
            <Link href="/">
              <LogoLight />
            </Link>
            <span className="sr-only">{config.appName}</span>
          </h1>
         {/* <ul className="flex items-center gap-5">
             <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="/">{raw("home")}</Link>
              </Button>
            </li> */}
            {/* <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="mailto:jvrs.90@gmail.com">{raw("contact")}</Link>
              </Button>
            </li> 
          </ul>*/}
        </div>
        {!session && (
          <ul className="flex items-center gap-2">
            <li className="hidden md:inline-block">
              <Button asChild variant="outline" size="sm" className="bg-transparent hover:dark:bg-white/10 hover:dark:text-white">
                <Link href={`/${locale}/sign-in`}>{raw("login")}</Link>
              </Button>
            </li>

            <li>
              <Button asChild size="sm">
                <Link href={`/${locale}/sign-up`}>{raw("signUp")}</Link>
              </Button>
            </li>
          </ul>
        )}
      </div>

      <div></div>
    </nav>
  );
};
