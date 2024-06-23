import { getCdrSellersSellerIdUsersUserIdPurchases } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const useUserSellerPurchases = (userId: string, sellerId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userSellerPurchase", userId],
    queryFn: () => {
      return getCdrSellersSellerIdUsersUserIdPurchases({
        path: { user_id: userId, seller_id: sellerId },
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