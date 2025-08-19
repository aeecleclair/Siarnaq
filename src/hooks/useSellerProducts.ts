import { getCdrSellersSellerIdProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useSellerProducts = (sellerId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellerProducts", sellerId ?? ""],
    queryFn: () =>
      getCdrSellersSellerIdProducts({
        path: { seller_id: sellerId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!sellerId,
  });

  return {
    products:
      data?.data?.sort((a, b) => {
        return Number(a.needs_validation) - Number(b.needs_validation);
      }) || [],
    isLoading,
    refetch,
  };
};
