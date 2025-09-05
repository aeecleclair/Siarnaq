import { useToken } from "./useToken";

import { getCdrUsersUserIdPurchases } from "@/api";

import { useQuery } from "@tanstack/react-query";

export const useUserPurchases = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPurchase", userId ?? ""],
    queryFn: () =>
      getCdrUsersUserIdPurchases({
        path: { user_id: userId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    purchases: data?.data || [],
    total: data?.data?.reduce<number>(
      (acc, purchase) => acc + (purchase.quantity * purchase.price) / 100,
      0,
    ),
    isLoading,
    refetch,
  };
};
