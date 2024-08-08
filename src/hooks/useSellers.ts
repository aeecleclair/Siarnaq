import { useToken } from "./useToken";
import { getCdrSellers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useSellers = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: getCdrSellers,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    sellers: data?.data || [],
    isLoading,
    refetch,
  };
};
