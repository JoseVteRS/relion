import { List } from "@/db/schema";

export const convertListDates = (list: List) => ({
    ...list,
    createdAt: list.createdAt ? new Date(list.createdAt) : null,
    updatedAt: list.updatedAt ? new Date(list.updatedAt) : null,
  });