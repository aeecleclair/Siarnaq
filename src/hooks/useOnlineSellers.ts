import { useToken } from "./useToken";
import { getCdrOnlineSellers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useOnlineSeller = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: getCdrOnlineSellers,
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    onlineSellers: data?.data,
    isLoading,
    refetch,
  };
};
