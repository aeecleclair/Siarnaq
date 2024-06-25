import { useToken } from "./useToken";
import { getCdrSellersSellerIdUsersUserIdPurchases } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUserSellerPurchases = (
  userId: string | null,
  sellerId: string | null,
) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userSellerPurchase", userId ?? "", sellerId ?? ""],
    queryFn: () =>
      getCdrSellersSellerIdUsersUserIdPurchases({
        path: { user_id: userId!, seller_id: sellerId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId && !!sellerId,
  });

  return {
    purchases: data?.data,
    isLoading,
    refetch,
  };
};
