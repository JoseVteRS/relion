import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export const NoSee = () => {
  const router = useRouter();
  return (
    <div className="h-screen grid place-items-center">
      <div>
        <p className="text-4xl font-bold">Shh..</p>
        <p className="text-xl font-bold text-neutral-300">
          No mires, es sorpresa 🙈
        </p>
        <Button
          variant="link"
          size="sm"
          className="p-0"
          onClick={() => router.back()}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
