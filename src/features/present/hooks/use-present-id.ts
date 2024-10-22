import { useParams } from "next/navigation";

export const usePresentId = () => {
  const params = useParams();
  return params.presentId as string;
};
