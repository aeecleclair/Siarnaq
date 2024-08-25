import { getCdrSellersSellerIdProductsProductIdData } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useSellerProductData = (
  sellerId: string | null,
  productId: string | null,
) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellerProductData", sellerId ?? "", productId ?? ""],
    queryFn: () =>
      getCdrSellersSellerIdProductsProductIdData({
        path: { seller_id: sellerId!, product_id: productId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!sellerId && !!productId,
  });

  return {
    data: data?.data || [],
    isLoading,
    refetch,
  };
};
