import Link from "next/link";
import { Button } from "../ui/button";
import config from "../../../config/config";
import Logo from "./logo/logo";
import Image from "next/image";

export const Navbar = () => {
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

        <ul className="flex items-center justify-end gap-4">
          <li>
            <Button asChild variant="link" size="sm" className="text-white p-0">
              <Link href="/">Inicio</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link" size="sm" className="text-white p-0">
              <Link href="mailto:jvrs.90@gmail.com">Contacto</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
