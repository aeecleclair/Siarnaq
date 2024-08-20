import { getCdrOnlineSellers } from "@/api";
import { useQuery } from "@tanstack/react-query";

import { useToken } from "./useToken";

export const useOnlineSellers = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["onlineSellers"],
    queryFn: getCdrOnlineSellers,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    onlineSellers: data?.data || [],
    isLoading,
    refetch,
  };
};
