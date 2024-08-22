import { getCdrProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useProducts = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getCdrProducts,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    products: data?.data || [],
    isLoading,
    refetch,
  };
};
