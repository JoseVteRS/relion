import Link from "next/link";
import { Button } from "../ui/button";
import config from "../../../config/config";
import Logo from "./logo/logo";
import { auth } from "@/auth";
import { UserButton } from "@/features/auth/components/user-button";

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className=" bg-neutral-950 text-neutral-100">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="text-white flex-1">
          <h1 className="font-bold text-lg">
            <Link href="/">
              <Logo />
            </Link>
            <span className="sr-only">{config.appName}</span>
          </h1>
        </div>
        {!!session ? (
          <ul className="flex items-center justify-end gap-4">
            <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="/dashboard">Escritorio</Link>
              </Button>
            </li>
            <li>
              <UserButton />
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-end gap-4">
            <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="/">Inicio</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="mailto:jvrs.90@gmail.com">Contacto</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-white p-0"
              >
                <Link href="/sign-in">Iniciar sesión</Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                variant="primary"
                size="default"
                className="text-white p-0"
              >
                <Link href="/sign-up">Registrarse</Link>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
