import Image from "next/image";
const Logo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo/iso-light.svg"
      alt="Logo"
      width={100}
      height={100}
      className="size-6"
    />
    <Image
      src="/logo/name-light.svg"
      alt="Logo"
      width={100}
      height={100}
      className="size-14"
    />
  </div>
);
export default Logo;
