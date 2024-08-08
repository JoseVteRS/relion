export function generateShareLink(listId: string) {
  const url = new URL(`${process.env.NEXT_PUBLIC_APP_URL!}/list`);
  
  url.searchParams.set("listId", listId);

  return url.toString();
}