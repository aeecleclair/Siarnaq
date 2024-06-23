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
    isLoading,
    refetch,
  };
};
