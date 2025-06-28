import { getCdrSellersSellerIdProductsProductIdTickets } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useSellerProductTickets = (
  sellerId: string | null,
  productId: string | null,
) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellerProductTicket", sellerId ?? "", productId ?? ""],
    queryFn: () =>
      getCdrSellersSellerIdProductsProductIdTickets({
        path: { seller_id: sellerId!, product_id: productId! },
      }),
    retry: 3,
    enabled: !isTokenExpired() && !!sellerId && !!productId,
  });

  const data2 = data?.data?.map((ticket) => ({
    id: ticket.id,
    product_id: ticket.product_id,
    expiration: new Date(ticket.expiration),
    max_use: ticket.max_use,
    name: ticket.name,
  }));

  return {
    data: data2 || [],
    isLoading,
    refetch,
  };
};
