import { getCdrUsersMeSellers } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useSellers = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: getCdrUsersMeSellers,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    sellers: data?.data || [],
    isLoading,
    refetch,
  };
};
