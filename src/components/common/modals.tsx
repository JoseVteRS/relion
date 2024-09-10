"use client";

import { useEffect, useState } from "react";
import { SubscriptionModal } from "@/features/subscriptions/components/subscription-modal";
import { ReachedLimitPremiumModal } from "@/features/subscriptions/components/reached-limit-premium-modal";
import { ReachedLImitFreeModal } from "@/features/subscriptions/components/reached-limit-free-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SubscriptionModal />
      <ReachedLimitPremiumModal />
      <ReachedLImitFreeModal />
    </>
  );
};
