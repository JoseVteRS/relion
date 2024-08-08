export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:h-screen flex items-center justify-center ">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
}
