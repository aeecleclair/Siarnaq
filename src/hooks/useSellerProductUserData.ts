import { useToken } from "./useToken";

import { getCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId } from "@/api";

import { useQuery } from "@tanstack/react-query";

export const useSellerProductUserData = (
  sellerId: string | null,
  productId: string | null,
  userId: string | null,
  fieldId: string | null,
) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "sellerProductUserData",
      sellerId ?? "",
      productId ?? "",
      userId ?? "",
      fieldId ?? "",
    ],
    queryFn: () =>
      getCdrSellersSellerIdProductsProductIdUsersUserIdDataFieldId({
        path: {
          seller_id: sellerId!,
          product_id: productId!,
          user_id: userId!,
          field_id: fieldId!,
        },
      }),
    retry: 3,
    enabled:
      !isTokenExpired() && !!sellerId && !!productId && !!userId && !!fieldId,
  });

  return {
    response: data?.data || [],
    isLoading,
    refetch,
  };
};
