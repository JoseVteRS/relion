import { db } from "@/db/drizzle";
import { lists, presents, tiers, users } from "@/db/schema";
import { and, countDistinct, eq } from "drizzle-orm";

export async function checkSubscriptionLimit(
  user: typeof users.$inferSelect,
  tier: typeof tiers.$inferSelect
): Promise<boolean> {
  // Contar las listas del usuario
  const [listCount] = await db
    .select({ count: countDistinct(lists.id) })
    .from(lists)
    .where(eq(lists.userId, user.id));

  // Verificar si el usuario ha alcanzado el límite de listas
  if (listCount.count >= tier.maxLists) {
    return false;
  }

  // Contar los regalos por lista del usuario
  const [presentCount] = await db
    .select({ count: countDistinct(presents.id) })
    .from(presents)
    .innerJoin(lists, eq(presents.listId, lists.id))
    .where(and(eq(lists.userId, user.id), eq(presents.userId, user.id)))
    .groupBy(lists.id)
    .orderBy(countDistinct(presents.id));

  // Verificar si el usuario ha alcanzado el límite de regalos por lista
  if (presentCount && presentCount.count >= tier.maxPresentsPerList) {
    return false;
  }

  return true;
}
