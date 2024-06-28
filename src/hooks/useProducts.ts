import { useToken } from "./useToken";
import { getCdrProducts } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getCdrProducts,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    products: data?.data,
    isLoading,
    refetch,
  };
};
