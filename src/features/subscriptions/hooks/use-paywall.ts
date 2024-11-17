import { useGetCountLists } from "@/features/list/api/use-get-count-lists";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";
import { useSubscriptionModalStore } from "@/features/subscriptions/store/use-subscription-modal.store";
import { useSession } from "next-auth/react";
import { useTier } from "../api/use-get-tier";
import { useReachedLimitFreeModalStore } from "../store/use-reached-limit-free-modal.store";
import { useReachedLimitPremiumModalStore } from "../store/use-reached-limit-premium-modal.store";

const DEFAULT_MAX_LISTS = 1;

export const usePaywall = () => {
  const session = useSession();

  // Modal stores
  const subscriptionModalStore = useSubscriptionModalStore();
  const reachedListLimitStore = useReachedLimitFreeModalStore();
  const reachedListLimitPremiumStore = useReachedLimitPremiumModalStore();

  // API
  const { data: countLists, isLoading: isLoadingCountLists } =
    useGetCountLists();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();
  const { data: tier, isLoading: isLoadingTier } = useTier(
    session.data?.user?.tierId
  );

  if (isLoadingTier || !tier) {
    return {
      isPremium: false,
      shouldBlock: false,
      hasReachedListLimit: false,
      isLoading: true,
      triggerPaywall: () => {},
    };
  }

  // Business logic
  const isSubscriptionExpired = subscription?.status === "expired";
  const hasActiveSubscription =
    !isLoadingSubscription && !isSubscriptionExpired;

  const getListLimit = () => {
    if (isLoadingTier || !tier) return DEFAULT_MAX_LISTS;
    return hasActiveSubscription ? tier.maxLists : DEFAULT_MAX_LISTS;
  };

  const hasReachedListLimit = () => {
    if (isLoadingCountLists) return false;
    const listLimit = getListLimit();
    return countLists?.count! >= listLimit;
  };

  const shouldBlock = isSubscriptionExpired;

  return {
    isPremium: tier.name === "PREMIUM",
    shouldBlock,
    hasReachedListLimit: hasReachedListLimit(),
    isLoading: isLoadingSubscription || isLoadingCountLists || isLoadingTier,
    triggerPaywall: () => reachedListLimitPremiumStore.onOpen(),
  };
};
