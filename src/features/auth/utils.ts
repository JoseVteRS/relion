import { auth } from "@/auth";

export const protectServer = async () => {
  const session = await auth();
  return session;
};
