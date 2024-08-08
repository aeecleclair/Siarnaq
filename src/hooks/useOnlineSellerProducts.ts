import { useToken } from "./useToken";
import {
  getCdrOnlineSellersSellerIdProducts,
  getCdrSellersSellerIdUsersUserIdPurchases,
} from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useOnlineSellerProducts = (sellerId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["onlineSellerProducts", sellerId ?? ""],
    queryFn: () =>
      getCdrOnlineSellersSellerIdProducts({
        path: { seller_id: sellerId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!sellerId,
  });

  return {
    onlineProducts: data?.data || [],
    isLoading,
    refetch,
  };
};
