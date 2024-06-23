import { getCdrUsersUserIdPurchases } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserPurchases = (userId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPurchase", userId],
    queryFn: () => {
      return getCdrUsersUserIdPurchases({
        path: { user_id: userId },
      });
    },
    retry: 1,
  });

  return {
    purchases: data?.data,
    total: data?.data?.reduce<number>(
      (acc, purchase) => acc + purchase.quantity * purchase.price,
      0,
    ),
    isLoading,
    refetch,
  };
};
