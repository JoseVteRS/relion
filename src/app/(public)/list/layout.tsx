import { Mobilebar } from "@/app/dashboard/_components/mobilebar";
import { auth } from "@/auth";

export default async function ListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authUser = await auth();

  const isUserAuthenticated = authUser?.user?.id;

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen">
        <div className="container mx-auto py-5">{children}</div>
        {isUserAuthenticated && (
          <div className="sticky bottom-0 w-full ">
            <Mobilebar />
          </div>
        )}
      </div>
    </div>
  );
}
