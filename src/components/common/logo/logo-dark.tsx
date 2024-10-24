import Image from "next/image";
const LogoDark = () => (
  <div className="flex items-center gap-x-2 hover:opacity-75 transition-opacity h-[68px] px-4">
    <Image
      src="/logo/iso-dark.svg"
      alt="Logo"
      width={100}
      height={100}
      className="size-6"
    />
    <Image
      src="/logo/name-dark.svg"
      alt="Logo"
      width={100}
      height={100}
      className="size-14"
    />
  </div>
);
export default LogoDark;
