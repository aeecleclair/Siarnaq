import { useToken } from "./useToken";
import { getCdrProducts, getCdrSellersSellerIdProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSellerProducts = (sellerId: string) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellerProducts", sellerId],
    queryFn: () =>
      getCdrSellersSellerIdProducts({
        path: { seller_id: sellerId },
      }),
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    products: data?.data,
    isLoading,
    refetch,
  };
};
