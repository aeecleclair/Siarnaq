import { useToken } from "./useToken";
import { getCdrSellersSellerIdProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

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
    products: data?.data,
    isLoading,
    refetch,
  };
};
