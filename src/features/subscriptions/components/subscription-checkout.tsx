import { Button } from "@/components/ui/button";
import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";

export const SubscriptionCheckout = () => {
  const checkoutMutation = useCheckoutSubscription();

  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  return (
    <Button
      onClick={() => checkoutMutation.mutate()}
      disabled={checkoutMutation.isPending}
      variant="ghost"
      size="sm"
    >
      {subscription ? "Manage" : "Upgrade"}
    </Button>
  );
};
